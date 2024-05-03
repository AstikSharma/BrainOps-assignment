import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later',
});
app.use(limiter);


// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/brainOps', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

// Define User schema and model with additional fields
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String },
  name: { type: String },
});

// Hash password before saving user
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

const User = mongoose.model('User', userSchema);

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    }
});

const Blog = mongoose.model('Blog', blogSchema);

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587, // Port for STARTTLS
    secure: process.env.SECURE == 'true', 
    auth: {
      user: process.env.USER, 
      pass: process.env.PASS 
    },
  });
  
  // Send email function
  async function sendEmail(email) {
    try {
      await transporter.sendMail({
        from: "Astik",
        to: email,
        subject: "Test Email",
        text: "This is a test email sent from nodemailer.",
      });
      console.log("Email sent successfully to:", email);
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  }
  app.get('/api/blog/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        res.json(blog);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
  });
  
  app.get('/api/blogs', async (req, res) => {
    try {
        const blog = await Blog.find()
        console.log(blog+" dfdf")
        res.json(blog);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
  });

  // Route to send emails
  app.post("/send-email", async (req, res) => {
    try {
      console.log("Send email request received.");
      
      // Fetch the latest registered user from the database
      const latestUser = await User.findOne({}, { email: 1 }, { sort: { _id: -1 } });
  
      if (latestUser) {
        const email = latestUser.email; // Extract the email address of the latest registered user
        await sendEmail(email); // Send email to the latest registered recipient
        res.status(200).json({ message: "Email sent successfully." });
      } else {
        res.status(404).json({ error: "No users found." });
      }
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  });


// Signup endpoint
app.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists. Please login instead.' });
    }

    // Create new user
    const user = new User({ email, password });
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, 'secret', { expiresIn: '2h' });

    // Return success message and token
    res.json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Login endpoint
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      // If user does not exist, return a message to signup
      return res.status(400).json({ error: 'User not found. Please signup.' });
    }

    // Check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      // If password is incorrect, return a message to signup
      return res.status(400).json({ error: 'Invalid password.' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, 'secret', { expiresIn: '2h' });

    // Return success message and token
    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
