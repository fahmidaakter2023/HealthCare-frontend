import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function PatientDashboard() {
  const navigate = useNavigate();

  // Static doctor database (frontend demo)
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

  // State
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState("");

  const [appointments, setAppointments] = useState([]);
  const [prescriptions] = useState([
    {
      doctor: "Dr. John Smith",
      medicine: "Paracetamol",
      times: "2 times a day",
      duration: "5 days",
    },
    {
      doctor: "Dr. Lisa Ray",
      medicine: "Antibiotic",
      times: "1 time a day",
      duration: "7 days",
    },
  ]);

  // Filter doctors
  const filteredDoctors = doctors.filter(
    (d) => d.specialization === selectedSpecialization
  );

  // Book appointment
  const handleBookAppointment = () => {
    if (!appointmentDate) {
      alert("Please select a date");
      return;
    }

    const newAppointment = {
      doctor: selectedDoctor.name,
      email: selectedDoctor.email,
      date: appointmentDate,
    };

    setAppointments([...appointments, newAppointment]);
    alert("Appointment booked successfully!");

    setSelectedDoctor(null);
    setAppointmentDate("");
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <div className="page-container">
      <div className="dashboard">
        <h2>Patient Dashboard</h2>
        <button onClick={handleLogout}>Logout</button>

        {/* Search by Specialization */}
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

        {/* Doctor List */}
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

        {/* Calendar */}
        {selectedDoctor && (
          <>
            <h3>Book Appointment with {selectedDoctor.name}</h3>
            <input
              type="date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
            />
            <br />
            <button onClick={handleBookAppointment}>Confirm Appointment</button>
          </>
        )}

        {/* Appointments */}
        <h3>My Appointments</h3>
        <ul>
          {appointments.map((a, idx) => (
            <li key={idx}>
              {a.date} — {a.doctor}
            </li>
          ))}
        </ul>

        {/* Prescriptions */}
        <h3>My Prescriptions</h3>
        <ul>
          {prescriptions.map((p, idx) => (
            <li key={idx}>
              <strong>{p.doctor}</strong><br />
              Medicine: {p.medicine}<br />
              Time: {p.times}<br />
              Duration: {p.duration}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PatientDashboard;
