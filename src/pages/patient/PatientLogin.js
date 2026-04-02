import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/AuthLayout';
import { patientLogin } from '../../services/api';

export default function PatientLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await patientLogin(form);
      sessionStorage.setItem('patient', JSON.stringify(data));
      navigate('/patient/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inp = { width: '100%', padding: '13px 16px', background: 'rgba(255,255,255,0.05)', border: '1.5px solid rgba(255,255,255,0.1)', borderRadius: 10, color: 'white', fontSize: 15, outline: 'none', boxSizing: 'border-box', fontFamily: 'sans-serif' };
  const lbl = { display: 'block', fontSize: 13, color: '#8892b0', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 };

  return (
    <AuthLayout
      title="Patient Login"
      subtitle="Access your health portal"
      footer={<>Don't have an account? <Link to="/patient/register" style={{ color: '#00c9a7' }}>Register here</Link><br />Are you a doctor? <Link to="/doctor/login" style={{ color: '#00c9a7' }}>Doctor Login</Link></>}
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {error && <div style={{ background: 'rgba(255,107,107,0.12)', border: '1px solid rgba(255,107,107,0.3)', color: '#ff9999', padding: '12px 16px', borderRadius: 10, fontSize: 14 }}>⚠ {error}</div>}

        <div><label style={lbl}>Username</label><input style={inp} name="username" placeholder="Enter your username" value={form.username} onChange={handleChange} required /></div>
        <div><label style={lbl}>Password</label><input style={inp} name="password" type="password" placeholder="Enter your password" value={form.password} onChange={handleChange} required /></div>

        <button type="submit" disabled={loading} style={{ background: '#00c9a7', color: '#0a1628', border: 'none', borderRadius: 10, padding: '14px', fontSize: 15, fontWeight: 700, cursor: 'pointer', width: '100%' }}>
          {loading ? 'Signing in...' : '→ Sign In'}
        </button>
      </form>
    </AuthLayout>
  );
}