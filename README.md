# BrainOps Assignment

![Project Image](https://s3.amazonaws.com/contents.newzenler.com/6034/courses/39920/data/thumb/s-3.jpg)

## About

The BrainOps assignment project is a full-stack web application built with React, Node.js, Express, and MongoDB. It provides functionality for user registration, login, and viewing blog posts. This project aims to demonstrate fundamental concepts of web development and showcases how to integrate React with a Node.js backend.

## Features

- User registration and login system with JWT authentication.
- Protected routes to ensure only authenticated users can access certain pages.
- Display of blog posts retrieved from a MongoDB database.
- Ability to send confirmation emails to newly registered users.

## Technologies Used

- **Frontend:** React.js, React Router, Axios
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** JSON Web Tokens (JWT)
- **Other:** Nodemailer (for sending emails), PropTypes (for type checking), CORS (for enabling cross-origin resource sharing)

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine
- MongoDB installed and running locally or remotely

### Installation

```bash

git clone https://github.com/AstikSharma/BrainOps-assignment
cd brainops
npm install
npm run dev
# New terminal for backend
cd src
cd backend
nodemon index.js

```
### Open your browser and go to http://localhost:5713 to access the application. For the backend go to http://localhost:5000.

## API Endpoints
-**POST /signup**: Register a new user
-**POST /login**: Login with existing credentials
-**GET /api/blogs**: Retrieve all blog posts
-**GET /api/blog/:id**: Retrieve a specific blog post by ID
-**POST /send-email**: Send a confirmation email to the latest registered user

## Screenshots
![Infinite Scroll](https://github.com/AstikSharma/BrainOps-assignment/assets/132981717/3696b591-3c6c-4409-980a-94bda315086e) 
(![Infinite Scroll](https://github.com/AstikSharma/BrainOps-assignment/assets/132981717/7cb368cb-5a21-4709-8cbb-9182933f4ba0))
![Infinite Scroll](https://github.com/AstikSharma/BrainOps-assignment/assets/132981717/5fe9d8a9-62d3-495a-b54b-9c6c7002ae2f)


