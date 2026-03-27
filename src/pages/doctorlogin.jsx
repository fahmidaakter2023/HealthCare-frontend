import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";

function DoctorLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [attempted, setAttempted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setAttempted(true);

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const doctor = users.find(
      (u) => u.email === email && u.password === password && u.role === "doctor"
    );

    if (!doctor) return;

    localStorage.setItem("currentUser", JSON.stringify(doctor));
    navigate("/doctor");
  };

  return (
    <div className="page-container">
      <div className="dashboard">
        <h2>Doctor Login</h2>

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          {attempted && (!email || !password) && (
            <p style={{ color: "red" }}>All fields required</p>
          )}

          {attempted && email && password &&
            !JSON.parse(localStorage.getItem("users") || "[]").find(
              (u) => u.email === email && u.password === password && u.role === "doctor"
            ) && <p style={{ color: "red" }}>Invalid credentials</p>}

          <button type="submit">Login</button>
        </form>

        <p>New doctor? <Link to="/doctor-signup">Signup</Link></p>
      </div>
    </div>
  );
}

export default DoctorLogin;