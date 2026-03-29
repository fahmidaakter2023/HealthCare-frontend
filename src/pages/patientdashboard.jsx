import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getPatientAppointments,
  bookAppointment,
  cancelAppointment,
} from "../services/api";
import "../App.css";

const doctors = [
  { name: "Dr. John Smith", email: "john.smith@hospital.com", specialization: "Cardiology", qualification: "MBBS, MD" },
  { name: "Dr. Lisa Ray", email: "lisa.ray@hospital.com", specialization: "Dermatology", qualification: "MBBS, DDVL" },
  { name: "Dr. Ahmed Khan", email: "ahmed.khan@hospital.com", specialization: "Neurology", qualification: "MBBS, DM" },
  { name: "Dr. Sara Ali", email: "sara.ali@hospital.com", specialization: "Orthopedics", qualification: "MBBS, MS" },
];

function PatientDashboard() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const data = await getPatientAppointments(currentUser?.name);
      setAppointments(Array.isArray(data) ? data : []);
    } catch {
      setMessage("Could not load appointments.");
    }
  };

  const handleBookAppointment = async () => {
    if (!appointmentDate) {
      setMessage("Please select a date");
      return;
    }
    try {
      const res = await bookAppointment({
        patientName: currentUser?.name,
        doctorName: selectedDoctor.name,
        date: appointmentDate,
      });
      setMessage(res.message || "Booked successfully!");
      setSelectedDoctor(null);
      setAppointmentDate("");
      loadAppointments();
    } catch {
      setMessage("Booking failed. Try again.");
    }
  };

  const handleCancel = async (id) => {
    try {
      await cancelAppointment(id);
      setMessage("Appointment cancelled.");
      loadAppointments();
    } catch {
      setMessage("Cancel failed.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  const filteredDoctors = doctors.filter(
    (d) => d.specialization === selectedSpecialization
  );

  return (
    <div className="page-container">
      <div className="dashboard">
        <h2>Patient Dashboard</h2>
        <button onClick={handleLogout}>Logout</button>

        {message && <p>{message}</p>}

        <h3>Search Doctor by Specialization</h3>
        <select
          value={selectedSpecialization}
          onChange={(e) => setSelectedSpecialization(e.target.value)}
        >
          <option value="">Select Specialization</option>
          <option value="Cardiology">Cardiology</option>
          <option value="Dermatology">Dermatology</option>
          <option value="Neurology">Neurology</option>
          <option value="Orthopedics">Orthopedics</option>
        </select>

        {selectedSpecialization && (
          <>
            <h3>Available Doctors</h3>
            <ul>
              {filteredDoctors.map((doc, idx) => (
                <li key={idx}>
                  <strong>{doc.name}</strong><br />
                  {doc.qualification}<br />
                  Email: {doc.email}<br />
                  <button onClick={() => setSelectedDoctor(doc)}>
                    Book Appointment
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}

        {selectedDoctor && (
          <>
            <h3>Book Appointment with {selectedDoctor.name}</h3>
            <input
              type="date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
            />
            <br />
            <button onClick={handleBookAppointment}>
              Confirm Appointment
            </button>
          </>
        )}

        <h3>My Appointments</h3>
        {appointments.length === 0 ? (
          <p>No appointments yet</p>
        ) : (
          <ul>
            {appointments.map((a) => (
              <li key={a.id}>
                {a.date} — {a.doctorName} ({a.status})
                <br />
                <button onClick={() => handleCancel(a.id)}>Cancel</button>
              </li>
            ))}
          </ul>
        )}

        <h3>My Prescriptions</h3>
        <p style={{ color: "gray" }}>Prescriptions will load here from backend.</p>
      </div>
    </div>
  );
}

export default PatientDashboard;