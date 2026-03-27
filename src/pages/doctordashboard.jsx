import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function DoctorDashboard() {
  const navigate = useNavigate();

  // Appointments booked by patients
  const [appointments, setAppointments] = useState([]);

  // Prescription form state
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [medicine, setMedicine] = useState("");
  const [times, setTimes] = useState("");
  const [duration, setDuration] = useState("");

  // Load appointments
  useEffect(() => {
    const storedAppointments =
      JSON.parse(localStorage.getItem("appointments")) || [];
    setAppointments(storedAppointments);
  }, []);

  // Handle prescription
  const handlePrescription = () => {
    if (!medicine || !times || !duration) {
      alert("Please fill all fields");
      return;
    }

    const currentDoctor =
      JSON.parse(localStorage.getItem("currentUser"))?.email || "Doctor";

    const newPrescription = {
      patient: selectedPatient.patient,
      doctor: currentDoctor,
      medicine,
      times,
      duration,
    };

    const existingPrescriptions =
      JSON.parse(localStorage.getItem("prescriptions")) || [];

    localStorage.setItem(
      "prescriptions",
      JSON.stringify([...existingPrescriptions, newPrescription])
    );

    alert("Prescription added successfully!");

    setSelectedPatient(null);
    setMedicine("");
    setTimes("");
    setDuration("");
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

        {/* Appointment List */}
        <h3>Patient Appointments</h3>
        {appointments.length === 0 ? (
          <p>No appointments yet.</p>
        ) : (
          <ul>
            {appointments.map((a, idx) => (
              <li key={idx}>
                <strong>{a.patient}</strong> — {a.date}
                <br />
                <button onClick={() => setSelectedPatient(a)}>
                  Give Prescription
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Prescription Form */}
        {selectedPatient && (
          <>
            <h3>Prescription for {selectedPatient.patient}</h3>

            <label>Medicine</label>
            <input
              type="text"
              value={medicine}
              onChange={(e) => setMedicine(e.target.value)}
            />

            <label>Times per day</label>
            <input
              type="text"
              placeholder="e.g. 2 times a day"
              value={times}
              onChange={(e) => setTimes(e.target.value)}
            />

            <label>Duration</label>
            <input
              type="text"
              placeholder="e.g. 5 days"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />

            <button onClick={handlePrescription}>Submit Prescription</button>
          </>
        )}
      </div>
    </div>
  );
}

export default DoctorDashboard;
