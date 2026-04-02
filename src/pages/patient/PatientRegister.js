import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/AuthLayout';
import { patientRegister } from '../../services/api';

export default function PatientRegister() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', age: '', gender: '', username: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    setLoading(true);
    try {
      const data = await patientRegister(form);
      setSuccess(data.message);
      setTimeout(() => navigate('/patient/login'), 1500);
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
      title="Create Account"
      subtitle="Join as a patient today"
      footer={<>Already have an account? <Link to="/patient/login" style={{ color: '#00c9a7' }}>Sign in</Link></>}
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {error && <div style={{ background: 'rgba(255,107,107,0.12)', border: '1px solid rgba(255,107,107,0.3)', color: '#ff9999', padding: '12px 16px', borderRadius: 10, fontSize: 14 }}>⚠ {error}</div>}
        {success && <div style={{ background: 'rgba(0,201,167,0.12)', border: '1px solid rgba(0,201,167,0.3)', color: '#00c9a7', padding: '12px 16px', borderRadius: 10, fontSize: 14 }}>✓ {success}</div>}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div><label style={lbl}>Full Name</label><input style={inp} name="name" placeholder="John Doe" value={form.name} onChange={handleChange} required /></div>
          <div><label style={lbl}>Age</label><input style={inp} name="age" type="number" placeholder="25" value={form.age} onChange={handleChange} /></div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div><label style={lbl}>Email</label><input style={inp} name="email" type="email" placeholder="john@email.com" value={form.email} onChange={handleChange} required /></div>
          <div><label style={lbl}>Phone</label><input style={inp} name="phone" placeholder="+880 1..." value={form.phone} onChange={handleChange} /></div>
        </div>

        <div>
          <label style={lbl}>Gender</label>
          <select style={inp} name="gender" value={form.gender} onChange={handleChange}>
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div><label style={lbl}>Username</label><input style={inp} name="username" placeholder="username" value={form.username} onChange={handleChange} required /></div>
          <div><label style={lbl}>Password</label><input style={inp} name="password" type="password" placeholder="••••••••" value={form.password} onChange={handleChange} required /></div>
        </div>

        <button type="submit" disabled={loading} style={{ background: '#00c9a7', color: '#0a1628', border: 'none', borderRadius: 10, padding: '14px', fontSize: 15, fontWeight: 700, cursor: 'pointer', width: '100%', marginTop: 4 }}>
          {loading ? 'Creating account...' : 'Create Account →'}
        </button>
      </form>
    </AuthLayout>
  );
}