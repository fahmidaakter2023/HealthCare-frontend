import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/AuthLayout';
import { doctorRegister } from '../../services/api';

export default function DoctorRegister() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', specialization: '', email: '', phone: '', username: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    setLoading(true);
    try {
      const data = await doctorRegister(form);
      setSuccess(data.message);
      setTimeout(() => navigate('/doctor/login'), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

 const inp = { 
  width: '100%', 
  padding: '13px 16px', 
  background: 'rgba(255,255,255,0.05)', 
  border: '1.5px solid rgba(255,255,255,0.1)', 
  borderRadius: 10, 
  color: 'white', 
  fontSize: 15, 
  outline: 'none', 
  boxSizing: 'border-box', 
  fontFamily: 'sans-serif',
  colorScheme: 'dark'
};
  const lbl = { display: 'block', fontSize: 13, color: '#8892b0', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 };

  const specializations = ['Cardiology','Dermatology','General Practice','Neurology','Orthopedics','Pediatrics','Psychiatry','Surgery','Other'];

  return (
    <AuthLayout
      title="Join as Doctor"
      subtitle="Create your doctor account"
      footer={<>Already registered? <Link to="/doctor/login" style={{ color: '#00c9a7' }}>Sign in</Link></>}
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {error && <div style={{ background: 'rgba(255,107,107,0.12)', border: '1px solid rgba(255,107,107,0.3)', color: '#ff9999', padding: '12px 16px', borderRadius: 10, fontSize: 14 }}>⚠ {error}</div>}
        {success && <div style={{ background: 'rgba(0,201,167,0.12)', border: '1px solid rgba(0,201,167,0.3)', color: '#00c9a7', padding: '12px 16px', borderRadius: 10, fontSize: 14 }}>✓ {success}</div>}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div><label style={lbl}>Full Name</label><input style={inp} name="name" placeholder="Dr. John Smith" value={form.name} onChange={handleChange} required /></div>
          <div><label style={lbl}>Phone</label><input style={inp} name="phone" placeholder="+880 1..." value={form.phone} onChange={handleChange} /></div>
        </div>

        <div>
          <label style={lbl}>Specialization</label>
          <select style={{ ...inp, colorScheme: 'dark' }} name="specialization" value={form.specialization} onChange={handleChange} required>
  <option value="" style={{ background: '#112240', color: 'white' }}>Select specialization</option>
  {specializations.map(s => (
    <option key={s} value={s} style={{ background: '#112240', color: 'white' }}>{s}</option>
  ))}
</select>
        </div>

        <div><label style={lbl}>Email</label><input style={inp} name="email" type="email" placeholder="doctor@hospital.com" value={form.email} onChange={handleChange} required /></div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div><label style={lbl}>Username</label><input style={inp} name="username" placeholder="username" value={form.username} onChange={handleChange} required /></div>
          <div><label style={lbl}>Password</label><input style={inp} name="password" type="password" placeholder="••••••••" value={form.password} onChange={handleChange} required /></div>
        </div>

        <button type="submit" disabled={loading} style={{ background: '#00c9a7', color: '#0a1628', border: 'none', borderRadius: 10, padding: '14px', fontSize: 15, fontWeight: 700, cursor: 'pointer', width: '100%', marginTop: 4 }}>
          {loading ? 'Creating account...' : 'Create Doctor Account →'}
        </button>
      </form>
    </AuthLayout>
  );
}