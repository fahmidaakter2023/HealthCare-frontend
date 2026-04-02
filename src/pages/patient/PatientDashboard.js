import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPatientAppointments, bookAppointment, cancelAppointment, getAllDoctors } from '../../services/api';
import './PatientDashboard.css'; // Ensure this path is correct

export default function PatientDashboard() {
  const navigate = useNavigate();
  const patient = JSON.parse(sessionStorage.getItem('patient') || 'null');
  
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookForm, setBookForm] = useState({ doctorName: '', date: '' });
  const [bookMsg, setBookMsg] = useState({ text: '', type: '' });
  const [booking, setBooking] = useState(false);
  const [activeTab, setActiveTab] = useState('appointments');
  const [doctorList, setDoctorList] = useState([]);

  useEffect(() => {
    if (!patient) {
      navigate('/patient/login');
      return;
    }
    loadAppointments();
    loadDoctors();
  }, []);

  const loadAppointments = async () => {
    setLoading(true);
    try {
      const data = await getPatientAppointments(patient.name);
      setAppointments(data || []);
    } catch {
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  const loadDoctors = async () => {
  try {
    const data = await getAllDoctors();
    // If data is an array, use it. If it's an object containing an array, 
    // you might need data.doctors. For now, we ensure it's at least an empty array.
    setDoctorList(Array.isArray(data) ? data : []); 
  } catch (err) {
    console.error("Fetch error:", err);
    setDoctorList([]);
  }
};
  const handleBook = async (e) => {
    e.preventDefault();
    setBookMsg({ text: '', type: '' });
    setBooking(true);
    try {
      const res = await bookAppointment({
        patientName: patient.name,
        doctorName: bookForm.doctorName,
        date: bookForm.date,
      });
      setBookMsg({ text: res.message, type: 'success' });
      setBookForm({ doctorName: '', date: '' });
      loadAppointments();
    } catch (err) {
      setBookMsg({ text: err.message, type: 'error' });
    } finally {
      setBooking(false);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm('Cancel this appointment?')) return;
    try {
      await cancelAppointment(id);
      setAppointments((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  if (!patient) return null;

  return (
    <div className="dashboard-page">
      {/* Navbar matches your .nav CSS */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 32px', borderBottom: '1px solid rgba(0,201,167,0.2)', background: 'rgba(10,22,40,0.9)' }}>
        <div style={{ fontSize: 20, fontWeight: 700 }}>⚕ Medi<span style={{ color: '#00c9a7' }}>Care</span></div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span className="user-pill">👤 {patient.name}</span>
          <button 
            onClick={() => { sessionStorage.removeItem('patient'); navigate('/'); }} 
            className="nav-item" 
            style={{ color: '#ff6b6b', padding: '8px 16px' }}
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="dashboard-container">
        {/* Sidebar */}
        <aside className="sidebar stat-box"> {/* Added stat-box for background consistency */}
          <div className="sidebar-avatar">
            <div className="avatar-circle">{patient.name?.charAt(0).toUpperCase()}</div>
            <div>
              <div className="avatar-name">{patient.name}</div>
              <div className="avatar-role">Patient Member</div>
            </div>
          </div>

          <div className="sidebar-stats">
            <div className="stat-box">
              <span className="stat-n">{appointments.length}</span>
              <span className="stat-l">Total</span>
            </div>
            <div className="stat-box">
              <span className="stat-n" style={{ color: '#f4c543' }}>
                {appointments.filter(a => a.status === 'Pending').length}
              </span>
              <span className="stat-l">Pending</span>
            </div>
            <div className="stat-box">
              <span className="stat-n" style={{ color: '#00c9a7' }}>
                {appointments.filter(a => a.status === 'Confirmed').length}
              </span>
              <span className="stat-l">Done</span>
            </div>
          </div>

          <div className="sidebar-nav">
            <button 
              className={`nav-item ${activeTab === 'appointments' ? 'active' : ''}`} 
              onClick={() => setActiveTab('appointments')}
            >
              📅 My Appointments
            </button>
            <button 
              className={`nav-item ${activeTab === 'book' ? 'active' : ''}`} 
              onClick={() => setActiveTab('book')}
            >
              ➕ Book Appointment
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="dashboard-main">
          {activeTab === 'appointments' && (
            <section className="content-section">
              <div className="section-header">
                <h2>My Appointments</h2>
                <button onClick={loadAppointments} className="nav-item" style={{ border: '1px solid var(--border)' }}>
                  ↻ Refresh
                </button>
              </div>
              
              <div className="table-card stat-box" style={{ padding: 0 }}>
                {loading ? (
                  <div style={{ textAlign: 'center', padding: 60, color: '#8892b0' }}>Loading...</div>
                ) : appointments.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: 60, color: '#8892b0' }}>📭 No appointments found.</div>
                ) : (
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(0,201,167,0.15)', textAlign: 'left' }}>
                        {['Doctor', 'Date', 'Status', 'Action'].map(h => (
                          <th key={h} style={{ padding: '16px', color: '#8892b0', fontSize: 12 }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {appointments.map((a) => (
                        <tr key={a.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                          <td style={{ padding: '16px' }}><strong>Dr. {a.doctorName}</strong></td>
                          <td style={{ padding: '16px' }}>{a.appointmentDate}</td>
                          <td style={{ padding: '16px' }}>
                            <span style={{ 
                              color: a.status === 'Confirmed' ? '#00c9a7' : '#f4c543',
                              fontSize: 13,
                              fontWeight: 600
                            }}>
                              {a.status}
                            </span>
                          </td>
                          <td style={{ padding: '16px' }}>
                            <button 
                              onClick={() => handleCancel(a.id)} 
                              style={{ background: 'transparent', color: '#ff6b6b', border: '1px solid #ff6b6b', borderRadius: 6, padding: '4px 10px', cursor: 'pointer' }}
                            >
                              Cancel
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </section>
          )}

          {activeTab === 'book' && (
            <section className="content-section">
              <div className="section-header">
                <h2>Book Appointment</h2>
              </div>
              <div className="book-card stat-box">
                <p className="book-sub">Select your doctor and preferred date to request a consultation.</p>
                <form onSubmit={handleBook} className="book-form">
                  {bookMsg.text && (
                    <div style={{ 
                      padding: 12, 
                      borderRadius: 8, 
                      fontSize: 14,
                      backgroundColor: bookMsg.type === 'success' ? 'rgba(0,201,167,0.1)' : 'rgba(255,107,107,0.1)',
                      color: bookMsg.type === 'success' ? '#00c9a7' : '#ff6b6b'
                    }}>
                      {bookMsg.text}
                    </div>
                  )}
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <label style={{ fontSize: 12, color: '#8892b0' }}>SELECT DOCTOR</label>
                    <select 
                      style={{ 
                        padding: '12px', 
                        background: '#112240', 
                        color: 'white', 
                        border: '1px solid var(--border)', 
                        borderRadius: 8 
                      }}
                      value={bookForm.doctorName}
                      onChange={e => setBookForm({ ...bookForm, doctorName: e.target.value })}
                      required
                    >
                      <option value="">-- Choose a specialist --</option>
                      {doctorList.map(doc => (
                        <option key={doc.id} value={doc.name}>Dr. {doc.name} ({doc.specialization})</option>
                      ))}
                    </select>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <label style={{ fontSize: 12, color: '#8892b0' }}>PREFERRED DATE</label>
                    <input 
                      type="date" 
                      className="nav-item" 
                      style={{ background: '#112240', border: '1px solid var(--border)', color: 'white' }}
                      min={new Date().toISOString().split('T')[0]}
                      value={bookForm.date}
                      onChange={e => setBookForm({ ...bookForm, date: e.target.value })}
                      required
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={booking || !bookForm.doctorName}
                    style={{ 
                      background: '#00c9a7', 
                      color: '#0a1628', 
                      padding: 14, 
                      borderRadius: 10, 
                      border: 'none', 
                      fontWeight: 700,
                      cursor: booking ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {booking ? 'Requesting...' : '📅 Request Appointment'}
                  </button>
                </form>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}