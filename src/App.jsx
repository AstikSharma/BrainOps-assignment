import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Registration from "./components/Registration";
import Login from "./components/login";
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute component

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {/* Route to the home page wrapped in ProtectedRoute */}
          <Route
            path="/home"
            element={<ProtectedRoute element={<Home />} />}
          />
          {/* Routes for login and registration */}
          <Route path="/register" element={<Registration />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
