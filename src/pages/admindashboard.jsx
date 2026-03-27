import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function AdminDashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  const banUser = (email) => {
    const filtered = users.filter((u) => u.email !== email);
    setUsers(filtered);
    localStorage.setItem("users", JSON.stringify(filtered));
  };

  const patients = users.filter((u) => u.role === "patient");
  const doctors = users.filter((u) => u.role === "doctor");

  return (
    <div className="page-container">
      <div className="dashboard">
        <h2>Admin Dashboard</h2>
        <button onClick={handleLogout}>Logout</button>

        <h3>Patients</h3>
        <ul>
          {patients.map((p, idx) => (
            <li key={idx}>
              <strong>{p.email}</strong><br />
              Appointments: {p.appointments?.length || 0}
              <br />
              <button onClick={() => banUser(p.email)}>Ban Patient</button>
            </li>
          ))}
        </ul>

        <h3>Doctors</h3>
        <ul>
          {doctors.map((d, idx) => (
            <li key={idx}>
              <strong>{d.email}</strong><br />
              Specialization: {d.specialization || "General"}
              <br />
              <button onClick={() => banUser(d.email)}>Ban Doctor</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminDashboard;
