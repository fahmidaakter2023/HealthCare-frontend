import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function PatientDashboard() {
  const navigate = useNavigate();

  // 🔹 Doctor Database
  const doctors = [
    {
      name: "Dr. John Smith",
      email: "john.smith@hospital.com",
      specialization: "Cardiology",
      qualification: "MBBS, MD",
    },
    {
      name: "Dr. Lisa Ray",
      email: "lisa.ray@hospital.com",
      specialization: "Dermatology",
      qualification: "MBBS, DDVL",
    },
    {
      name: "Dr. Ahmed Khan",
      email: "ahmed.khan@hospital.com",
      specialization: "Neurology",
      qualification: "MBBS, DM",
    },
    {
      name: "Dr. Sara Ali",
      email: "sara.ali@hospital.com",
      specialization: "Orthopedics",
      qualification: "MBBS, MS",
    },
  ];

  // 🔹 State
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [message, setMessage] = useState("");

  // 🔹 Load appointments from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("appointments")) || [];
    setAppointments(stored);
  }, []);

  // 🔹 Save appointments to localStorage
  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  // 🔹 Filter doctors
  const filteredDoctors = doctors.filter(
    (d) => d.specialization === selectedSpecialization
  );

  // 🔹 Book appointment
  const handleBookAppointment = () => {
    if (!appointmentDate) {
      setMessage("❌ Please select a date");
      return;
    }

    const newAppointment = {
      id: Date.now(),
      doctor: selectedDoctor.name,
      email: selectedDoctor.email,
      date: appointmentDate,
      status: "Pending",
    };

    setAppointments([...appointments, newAppointment]);
    setMessage("✅ Appointment booked successfully!");

    setSelectedDoctor(null);
    setAppointmentDate("");
  };

  // 🔹 Cancel appointment
  const handleCancel = (id) => {
    const updated = appointments.filter((a) => a.id !== id);
    setAppointments(updated);
  };

  // 🔹 Logout
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <div className="page-container">
      <div className="dashboard">
        <h2>Patient Dashboard</h2>

        <button onClick={handleLogout}>Logout</button>

        {message && <p>{message}</p>}

        {/* 🔍 Search */}
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

        {/* 👨‍⚕️ Doctor List */}
        {selectedSpecialization && (
          <>
            <h3>Available Doctors</h3>
            <ul>
              {filteredDoctors.map((doc, idx) => (
                <li key={idx}>
                  <strong>{doc.name}</strong> <br />
                  {doc.qualification} <br />
                  Email: {doc.email} <br />

                  <button onClick={() => setSelectedDoctor(doc)}>
                    Book Appointment
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}

        {/* 📅 Booking */}
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

        {/* 📋 Appointments */}
        <h3>My Appointments</h3>
        {appointments.length === 0 ? (
          <p>No appointments yet</p>
        ) : (
          <ul>
            {appointments.map((a) => (
              <li key={a.id}>
                📅 {a.date} — {a.doctor} ({a.status})
                <br />
                <button onClick={() => handleCancel(a.id)}>
                  Cancel
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* 💊 Prescriptions (demo) */}
        <h3>My Prescriptions</h3>
        <ul>
          <li>
            <strong>Dr. John Smith</strong><br />
            Medicine: Paracetamol <br />
            Time: 2 times/day <br />
            Duration: 5 days
          </li>
        </ul>
      </div>
    </div>
  );
}

export default PatientDashboard;