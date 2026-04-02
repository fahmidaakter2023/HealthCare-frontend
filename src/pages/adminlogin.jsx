import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../services/api";
import "../App.css";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await adminLogin(email, password);
      if (res.message === "Login successful") {
        localStorage.setItem("currentUser", JSON.stringify({ ...res, role: "admin" }));
        navigate("/admin");
      } else {
        setError("Invalid admin credentials");
      }
    } catch {
      setError("Server error.");
    }
  };

  return (
    <div className="page-container">
      <div className="dashboard">
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password"
            onChange={(e) => setPassword(e.target.value)} />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;