import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [attempted, setAttempted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setAttempted(true);

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const admin = users.find(
      (u) => u.email === email && u.password === password && u.role === "admin"
    );

    if (!admin) return;

    localStorage.setItem("currentUser", JSON.stringify(admin));
    navigate("/admin");
  };

  return (
    <div className="page-container">
      <div className="dashboard">
        <h2>Admin Login</h2>

        <form onSubmit={handleSubmit}>
          <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

          {attempted && <p style={{ color: "red" }}>
            Invalid admin credentials
          </p>}

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;