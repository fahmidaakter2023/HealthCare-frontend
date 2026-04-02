import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { patientLogin, doctorLogin, adminLogin } from "../services/api";
import "../App.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let res;
      if (role === "patient") res = await patientLogin(email, password);
      else if (role === "doctor") res = await doctorLogin(email, password);
      else res = await adminLogin(email, password);

      if (res.message === "Login successful") {
        localStorage.setItem("currentUser", JSON.stringify({ ...res, role }));
        if (role === "patient") navigate("/patient");
        else if (role === "doctor") navigate("/doctor");
        else navigate("/admin");
      } else {
        setError(res.error || "Invalid credentials");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="dashboard">
        <h2>Login</h2>

        <label>Select Role</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
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

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="login-instruction">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;