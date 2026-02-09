import "../App.css";

function About () {
  return (
    <div className="page-container">
      <div className="dashboard">
        <h2>About Us</h2>

        <h3>About the Developer</h3>
        <p>
          This healthcare management system is developed as an academic project
          focusing on usability, accessibility, and clean interface design using
          modern web technologies.
        </p>

        <h3>Contact Information</h3>
        <p>Email: humayra.csecu@gmail.com</p>
        <p>Phone: +880-1844-900130</p>
        <p>Location: Chittagong, Bangladesh</p>

        <h3>Frequently Asked Questions</h3>
        <p><strong>Who can use this system?</strong> Patients, doctors, and administrators.</p>
        <p><strong>Is patient data secure?</strong> Yes, role-based access is used.</p>
        <p><strong>Can appointments be managed online?</strong> Yes, digitally.</p>
      </div>
    </div>
  );
}

export default About ;
