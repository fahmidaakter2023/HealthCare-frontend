import { useState } from "react";
import { bookAppointment } from "../services/api";
import "../App.css";

function Appointment() {
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleBook = async (e) => {
    e.preventDefault();
    setError("");

    if (!doctor || !date) {
      setError("All fields required");
      return;
    }

    setLoading(true);
    try {
      const res = await bookAppointment({
        patientName: currentUser?.name,
        doctorName: doctor,
        date: date,
      });

      if (res.message) {
        alert(res.message);
        setDoctor("");
        setDate("");
      } else {
        setError(res.error || "Booking failed");
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
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? "Booking..." : "Confirm Booking"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Appointment;