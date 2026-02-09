import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");
  const [attempted, setAttempted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setAttempted(true);

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.email === email && u.password === password && u.role === role
    );

    if (!user) return;

    if (role === "patient") navigate("/patient");
    else if (role === "doctor") navigate("/doctor");
    else if (role === "admin") navigate("/admin");
  };

  return (
    <div className="page-container">
      <div className="dashboard">
        <h2>Login</h2>

        <label htmlFor="role">Select Role </label>
        <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
          <option value="admin">Admin</option>
        </select>

        <form onSubmit={handleSubmit}>
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

          {attempted && !email && !password && (
            <p style={{ color: "red" }}>Please enter email and password</p>
          )}
          {attempted &&
            email &&
            password &&
            !JSON.parse(localStorage.getItem("users") || "[]").find(
              (u) => u.email === email && u.password === password && u.role === role
            ) && <p style={{ color: "red" }}>Invalid credentials or role</p>}

          <button type="submit">Login</button>
        </form>

        <p className="login-instruction">
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
