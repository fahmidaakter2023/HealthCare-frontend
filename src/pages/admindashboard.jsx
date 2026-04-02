import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers, banUser } from "../services/api";
import "../App.css";

function AdminDashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => { loadUsers(); }, []);

  const loadUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(Array.isArray(data) ? data : []);
    } catch { alert("Could not load users."); }
  };

  const handleBan = async (id) => {
    await banUser(id);
    loadUsers();
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
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
          {patients.map((p) => (
            <li key={p.id}>
              <strong>{p.email}</strong><br />
              <button onClick={() => handleBan(p.id)}>Ban Patient</button>
            </li>
          ))}
        </ul>

        <h3>Doctors</h3>
        <ul>
          {doctors.map((d) => (
            <li key={d.id}>
              <strong>{d.email}</strong> — {d.specialization || "General"}<br />
              <button onClick={() => handleBan(d.id)}>Ban Doctor</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminDashboard;