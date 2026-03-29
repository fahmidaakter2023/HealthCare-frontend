import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { patientRegister, doctorRegister } from "../services/api";
import "../App.css";

function Signup() {
  const [role, setRole] = useState("patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [specialization, setSpecialization] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !username || !name) {
      setError("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      let res;

      if (role === "patient") {
        res = await patientRegister({
          name, email, phone, age, gender, username, password,
        });
      } else if (role === "doctor") {
        res = await doctorRegister({
          name, email, username, password, specialization,
        });
      } else {
        setError("Admin cannot self-register.");
        setLoading(false);
        return;
      }

      if (res.message?.includes("successful")) {
        alert("Registration successful! Please login.");
        navigate("/login");
      } else {
        setError(res.error || "Registration failed");
      }
    } catch {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="dashboard">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>

          <label>Select Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>

          <label>Full Name *</label>
          <input placeholder="Enter full name"
            onChange={(e) => setName(e.target.value)} />

          <label>Username *</label>
          <input placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)} />

          <label>Email *</label>
          <input type="email" placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)} />

          <label>Password *</label>
          <input type="password" placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)} />

          {role === "patient" && (
            <>
              <label>Phone</label>
              <input placeholder="Phone number"
                onChange={(e) => setPhone(e.target.value)} />

              <label>Age</label>
              <input placeholder="Age"
                onChange={(e) => setAge(e.target.value)} />

              <label>Gender</label>
              <select onChange={(e) => setGender(e.target.value)}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </>
          )}

          {role === "doctor" && (
            <>
              <label>Specialization</label>
              <input placeholder="e.g. Cardiology"
                onChange={(e) => setSpecialization(e.target.value)} />
            </>
          )}

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Sign Up"}
          </button>
        </form>

        <p className="login-instruction">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;