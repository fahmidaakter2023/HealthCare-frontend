import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existing = users.find((u) => u.email === email && u.role === role);
    if (existing) return alert("User exists. Please login.");

    users.push({ email, password, role });
    localStorage.setItem("users", JSON.stringify(users));
    navigate("/");
  };

  return (
    <div className="page-container">
      <div className="dashboard">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="role">Select Role</label>
          <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="admin">Admin</option>
          </select>

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Sign Up</button>
        </form>

        <p className="login-instruction">
          Already have an account? <a href="/">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
