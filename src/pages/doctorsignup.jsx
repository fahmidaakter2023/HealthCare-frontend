import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { doctorRegister } from "../services/api";
import "../App.css";

function DoctorSignup() {
  const [form, setForm] = useState({
    name: "", email: "", username: "", password: "", specialization: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await doctorRegister(form);
      if (res.message?.includes("successful")) {
        alert("Registration successful!");
        navigate("/doctor-login");
      } else {
        setError(res.error || "Registration failed");
      }
    } catch {
      setError("Server error.");
    }
  };

  return (
    <div className="page-container">
      <div className="dashboard">
        <h2>Doctor Signup</h2>
        <form onSubmit={handleSubmit}>
          {["name", "email", "username", "specialization"].map((f) => (
            <input key={f} name={f} placeholder={f} onChange={handleChange} />
          ))}
          <input name="password" type="password" placeholder="password"
            onChange={handleChange} />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit">Signup</button>
        </form>
        <p>Already registered? <Link to="/doctor-login">Login</Link></p>
      </div>
    </div>
  );
}

export default DoctorSignup;