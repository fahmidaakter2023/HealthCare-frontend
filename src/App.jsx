import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/home";
import About from "./pages/about";

// auth
import Login from "./pages/login";
import Signup from "./pages/signup";
import DoctorLogin from "./pages/doctorlogin";
import DoctorSignup from "./pages/doctorsignup";
import AdminLogin from "./pages/adminlogin";

// dashboards
import PatientDashboard from "./pages/patientdashboard";
import DoctorDashboard from "./pages/doctordashboard";
import AdminDashboard from "./pages/admindashboard";

// feature
import Appointment from "./pages/appointment";

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        {/* patient */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/patient" element={<PatientDashboard />} />

        {/* doctor */}
        <Route path="/doctor-login" element={<DoctorLogin />} />
        <Route path="/doctor-signup" element={<DoctorSignup />} />
        <Route path="/doctor" element={<DoctorDashboard />} />

        {/* admin */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />

        {/* feature */}
        <Route path="/appointment" element={<Appointment />} />

      </Routes>
    </Router>
  );
}

export default App;