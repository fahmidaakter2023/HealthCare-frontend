import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";

function DoctorSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [specialization, setSpecialization] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    users.push({
      email,
      password,
      specialization,
      role: "doctor",
    });

    localStorage.setItem("users", JSON.stringify(users));
    navigate("/doctor-login");
  };

  return (
    <div className="page-container">
      <div className="dashboard">
        <h2>Doctor Signup</h2>

        <form onSubmit={handleSubmit}>
          <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <input placeholder="Specialization" onChange={(e) => setSpecialization(e.target.value)} />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

          <button type="submit">Signup</button>
        </form>

        <p>Already registered? <Link to="/doctor-login">Login</Link></p>
      </div>
    </div>
  );
}

export default DoctorSignup;