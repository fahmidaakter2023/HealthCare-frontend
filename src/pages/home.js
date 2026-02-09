import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ textAlign: "center", padding: "60px" }}>
      <h1>Welcome to Healthcare System</h1>
      <p style={{ maxWidth: "600px", margin: "20px auto" }}>
        A digital healthcare platform where patients can book appointments,
        doctors can manage treatments, and admins can oversee the system.
      </p>

      <div style={{ marginTop: "40px" }}>
        <Link to="/login">
          <button style={{ margin: "10px" }}>Login</button>
        </Link>
        <Link to="/signup">
          <button style={{ margin: "10px" }}>Signup</button>
        </Link>
       <Link to="/about">
          <button style={{ margin: "10px" }}>About Us</button>
        </Link>
      </div>
    </div>
  );
}
