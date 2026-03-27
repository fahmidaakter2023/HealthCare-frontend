import { useState } from "react";
import "../App.css";

function Appointment() {
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [attempted, setAttempted] = useState(false);

  const handleBook = (e) => {
    e.preventDefault();
    setAttempted(true);

    if (!doctor || !date) return;

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const newAppointment = {
      patient: currentUser?.email,
      doctor,
      date,
    };

    const old = JSON.parse(localStorage.getItem("appointments")) || [];

    localStorage.setItem("appointments", JSON.stringify([...old, newAppointment]));

    alert("Appointment booked!");
    setDoctor("");
    setDate("");
    setAttempted(false);
  };

  return (
    <div className="page-container">
      <div className="dashboard">
        <h2>Book Appointment</h2>

        <form onSubmit={handleBook}>
          <input
            placeholder="Doctor Name"
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          {attempted && (!doctor || !date) && (
            <p style={{ color: "red" }}>All fields required</p>
          )}

          <button type="submit">Confirm Booking</button>
        </form>
      </div>
    </div>
  );
}

export default Appointment;