import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDoctorAppointments, confirmAppointment, addPrescription } from "../services/api";
import "../App.css";

function DoctorDashboard() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const [appointments, setAppointments] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [medicine, setMedicine] = useState("");
  const [times, setTimes] = useState("");
  const [duration, setDuration] = useState("");

  useEffect(() => { loadAppointments(); }, []);

  const loadAppointments = async () => {
    try {
      const data = await getDoctorAppointments();
      setAppointments(Array.isArray(data) ? data : []);
    } catch { alert("Could not load appointments."); }
  };

  const handleConfirm = async (id) => {
    await confirmAppointment(id);
    loadAppointments();
  };

  const handlePrescription = async () => {
    if (!medicine || !times || !duration) { alert("Fill all fields"); return; }
    try {
      await addPrescription({
        patientName: selectedPatient.patientName,
        doctorName: currentUser?.name,
        medicine, times, duration,
      });
      alert("Prescription added!");
      setSelectedPatient(null);
      setMedicine(""); setTimes(""); setDuration("");
    } catch { alert("Failed to add prescription."); }
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <div className="page-container">
      <div className="dashboard">
        <h2>Doctor Dashboard</h2>
        <button onClick={handleLogout}>Logout</button>

        <h3>Patient Appointments</h3>
        {appointments.length === 0 ? <p>No appointments yet.</p> : (
          <ul>
            {appointments.map((a, idx) => (
              <li key={idx}>
                <strong>{a.patientName}</strong> — {a.date} — {a.status}
                <br />
                {a.status !== "Confirmed" &&
                  <button onClick={() => handleConfirm(a.id)}>Confirm</button>}
                <button onClick={() => setSelectedPatient(a)}>Give Prescription</button>
              </li>
            ))}
          </ul>
        )}

        {selectedPatient && (
          <>
            <h3>Prescription for {selectedPatient.patientName}</h3>
            <label>Medicine</label>
            <input value={medicine} onChange={(e) => setMedicine(e.target.value)} />
            <label>Times per day</label>
            <input value={times} onChange={(e) => setTimes(e.target.value)} />
            <label>Duration</label>
            <input value={duration} onChange={(e) => setDuration(e.target.value)} />
            <button onClick={handlePrescription}>Submit Prescription</button>
          </>
        )}
      </div>
    </div>
  );
}

export default DoctorDashboard;