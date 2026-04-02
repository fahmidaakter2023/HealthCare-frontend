/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BASE_URL = 'http://localhost:8080/api';

export default function DoctorDashboard() {
  const navigate = useNavigate();
  const doctor = JSON.parse(sessionStorage.getItem('doctor') || 'null');
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [msg, setMsg] = useState({ text: '', type: '' });

  useEffect(() => {
    console.log('useEffect running');
    console.log('doctor:', doctor);
    if (!doctor) {
      console.log('no doctor, redirecting');
      navigate('/doctor/login');
      return;
    }
    console.log('calling loadAppointments');
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    console.log('loadAppointments called');
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/doctor/appointments?doctorName=${encodeURIComponent(doctor.name)}`);
      console.log('response status:', res.status);
      const data = await res.json();
      console.log('appointments data:', data);
      setAppointments(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log('fetch error:', err);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async (id) => {
    try {
      await fetch(`${BASE_URL}/doctor/appointments/${id}/confirm`, { method: 'POST' });
      setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'Confirmed' } : a));
      setMsg({ text: 'Appointment confirmed!', type: 'success' });
      setTimeout(() => setMsg({ text: '', type: '' }), 3000);
    } catch {
      setMsg({ text: 'Failed to confirm', type: 'error' });
    }
  };

  const handleReject = async (id) => {
    if (!window.confirm('Reject this appointment?')) return;
    try {
      await fetch(`${BASE_URL}/doctor/appointments/${id}/reject`, { method: 'POST' });
      setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'Cancelled' } : a));
      setMsg({ text: 'Appointment rejected.', type: 'error' });
      setTimeout(() => setMsg({ text: '', type: '' }), 3000);
    } catch {
      setMsg({ text: 'Failed to reject', type: 'error' });
    }
  };

  if (!doctor) return null;

  const list = Array.isArray(appointments) ? appointments : [];
  const filtered = filter === 'All' ? list : list.filter(a => a.status === filter);
  const pending = list.filter(a => a.status === 'Pending').length;
  const confirmed = list.filter(a => a.status === 'Confirmed').length;
  const cancelled = list.filter(a => a.status === 'Cancelled').length;
  const card = { background: 'rgba(17,34,64,0.8)', border: '1px solid rgba(0,201,167,0.15)', borderRadius: 16 };

  return (
    <div style={{ background: '#0a1628', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif' }}>

      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 32px', borderBottom: '1px solid rgba(0,201,167,0.2)', background: 'rgba(10,22,40,0.95)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ fontSize: 20, fontWeight: 700 }}>⚕ Medi<span style={{ color: '#00c9a7' }}>Care</span></div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ color: '#8892b0', fontSize: 14 }}>🩺 Dr. {doctor.name}</span>
          <button onClick={() => { sessionStorage.removeItem('doctor'); navigate('/'); }}
            style={{ background: 'rgba(255,107,107,0.15)', color: '#ff6b6b', border: '1px solid rgba(255,107,107,0.3)', borderRadius: 8, padding: '8px 16px', cursor: 'pointer', fontFamily: 'sans-serif' }}>
            Logout
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: 28 }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
          <div>
            <h1 style={{ fontSize: 26, marginBottom: 6 }}>Good day, Dr. {doctor.name} 👋</h1>
            <p style={{ color: '#8892b0' }}>{doctor.specialization} • {doctor.email}</p>
          </div>
          <button onClick={loadAppointments}
            style={{ background: 'rgba(255,255,255,0.06)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '8px 16px', cursor: 'pointer', fontFamily: 'sans-serif' }}>
            ↻ Refresh
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 28 }}>
          {[
            ['📋', 'Total', list.length, 'white'],
            ['⏳', 'Pending', pending, '#f4c543'],
            ['✓', 'Confirmed', confirmed, '#00c9a7'],
            ['✕', 'Cancelled', cancelled, '#ff6b6b'],
          ].map(([icon, label, val, color]) => (
            <div key={label} style={{ ...card, padding: 24, textAlign: 'center' }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
              <div style={{ fontSize: 32, fontWeight: 800, color, lineHeight: 1 }}>{val}</div>
              <div style={{ fontSize: 13, color: '#8892b0', marginTop: 6 }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
          <h2 style={{ fontSize: 20 }}>Patient Appointment Requests</h2>
          <div style={{ display: 'flex', gap: 6 }}>
            {['All', 'Pending', 'Confirmed', 'Cancelled'].map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{
                padding: '7px 14px', borderRadius: 99, border: '1px solid',
                borderColor: filter === f ? 'rgba(0,201,167,0.3)' : 'rgba(255,255,255,0.1)',
                background: filter === f ? 'rgba(0,201,167,0.12)' : 'transparent',
                color: filter === f ? '#00c9a7' : '#8892b0',
                cursor: 'pointer', fontSize: 13, fontFamily: 'sans-serif'
              }}>{f}</button>
            ))}
          </div>
        </div>

        {msg.text && (
          <div style={{
            background: msg.type === 'success' ? 'rgba(0,201,167,0.12)' : 'rgba(255,107,107,0.12)',
            border: `1px solid ${msg.type === 'success' ? 'rgba(0,201,167,0.3)' : 'rgba(255,107,107,0.3)'}`,
            color: msg.type === 'success' ? '#00c9a7' : '#ff9999',
            padding: '12px 16px', borderRadius: 10, fontSize: 14, marginBottom: 16
          }}>
            {msg.text}
          </div>
        )}

        <div style={{ ...card, overflow: 'hidden' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: 60, color: '#8892b0' }}>Loading...</div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 60, color: '#8892b0' }}>📭 No appointments found.</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(0,201,167,0.15)' }}>
                  {['#', 'Patient', 'Doctor', 'Date', 'Status', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', color: '#8892b0', fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.8 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((a, i) => (
                  <tr key={a.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '14px 16px', color: '#8892b0' }}>{i + 1}</td>
                    <td style={{ padding: '14px 16px' }}><strong>{a.patientName}</strong></td>
                    <td style={{ padding: '14px 16px', color: '#8892b0' }}>{a.doctorName}</td>
                    <td style={{ padding: '14px 16px' }}>{a.appointmentDate}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{
                        padding: '4px 12px', borderRadius: 99, fontSize: 12, fontWeight: 600,
                        background: a.status === 'Confirmed' ? 'rgba(0,201,167,0.15)' : a.status === 'Cancelled' ? 'rgba(255,107,107,0.15)' : 'rgba(244,197,67,0.15)',
                        color: a.status === 'Confirmed' ? '#00c9a7' : a.status === 'Cancelled' ? '#ff6b6b' : '#f4c543',
                        border: `1px solid ${a.status === 'Confirmed' ? 'rgba(0,201,167,0.3)' : a.status === 'Cancelled' ? 'rgba(255,107,107,0.3)' : 'rgba(244,197,67,0.3)'}`
                      }}>
                        {a.status === 'Confirmed' ? '✓' : a.status === 'Cancelled' ? '✕' : '⏳'} {a.status}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      {a.status === 'Pending' ? (
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button onClick={() => handleConfirm(a.id)}
                            style={{ background: 'linear-gradient(135deg,#00c9a7,#00a88e)', color: '#0a1628', border: 'none', borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontSize: 13, fontWeight: 700, fontFamily: 'sans-serif' }}>
                            ✓ Confirm
                          </button>
                          <button onClick={() => handleReject(a.id)}
                            style={{ background: 'rgba(255,107,107,0.15)', color: '#ff6b6b', border: '1px solid rgba(255,107,107,0.3)', borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontSize: 13, fontFamily: 'sans-serif' }}>
                            ✕ Reject
                          </button>
                        </div>
                      ) : (
                        <span style={{ color: a.status === 'Confirmed' ? '#00c9a7' : '#ff6b6b', fontSize: 13 }}>
                          {a.status === 'Confirmed' ? '✓ Done' : '✕ Rejected'}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}