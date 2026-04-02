import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [showAbout, setShowAbout] = useState(false);

  return (
    <div style={{ background: '#0a1628', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif' }}>

      {/* Navbar */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', borderBottom: '1px solid rgba(0,201,167,0.2)', position: 'sticky', top: 0, background: 'rgba(10,22,40,0.95)', zIndex: 100 }}>
        <div style={{ fontSize: 22, fontWeight: 700 }}>⚕ Medi<span style={{ color: '#00c9a7' }}>Care</span></div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <button onClick={() => setShowAbout(!showAbout)} style={{ background: 'transparent', color: '#8892b0', border: 'none', cursor: 'pointer', fontSize: 15, fontFamily: 'sans-serif', padding: '8px 16px' }}>About Us</button>
          <Link to="/patient/login" style={{ color: '#00c9a7', padding: '8px 20px', border: '1px solid #00c9a7', borderRadius: 8, textDecoration: 'none' }}>Patient Portal</Link>
          <Link to="/doctor/login" style={{ background: '#00c9a7', color: '#0a1628', padding: '8px 20px', borderRadius: 8, textDecoration: 'none', fontWeight: 700 }}>Doctor Portal</Link>
        </div>
      </nav>

      {/* About Us Modal */}
      {showAbout && (
  <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, overflowY: 'auto' }}>
    <div style={{ background: '#112240', border: '1px solid rgba(0,201,167,0.2)', borderRadius: 20, padding: 40, maxWidth: 680, width: '100%', position: 'relative', margin: 'auto' }}>
      <button onClick={() => setShowAbout(false)} style={{ position: 'absolute', top: 16, right: 20, background: 'none', border: 'none', color: '#8892b0', fontSize: 22, cursor: 'pointer' }}>✕</button>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>⚕</div>
        <h2 style={{ fontSize: 32, color: '#00c9a7', marginBottom: 8 }}>About MediCare</h2>
        <p style={{ color: '#8892b0', fontSize: 15, lineHeight: 1.7, maxWidth: 500, margin: '0 auto' }}>
          MediCare is your trusted digital healthcare companion — making quality medical care accessible, simple, and stress-free for everyone.
        </p>
      </div>

      {/* Mission */}
      <div style={{ background: 'rgba(0,201,167,0.06)', border: '1px solid rgba(0,201,167,0.15)', borderRadius: 12, padding: 20, marginBottom: 24, textAlign: 'center' }}>
        <div style={{ fontSize: 20, marginBottom: 6 }}>🎯 Our Mission</div>
        <p style={{ color: '#8892b0', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
          To bridge the gap between patients and doctors by providing a seamless, reliable, and modern appointment management platform that puts your health first.
        </p>
      </div>

      {/* Benefits */}
      <h3 style={{ fontSize: 16, color: '#00c9a7', marginBottom: 14, textTransform: 'uppercase', letterSpacing: 1 }}>✦ What We Offer</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
        {[
          { icon: '📅', title: 'Easy Appointment Booking', desc: 'Book appointments with your preferred specialist in just a few clicks, anytime from anywhere.' },
          { icon: '🩺', title: 'Verified Doctors', desc: 'Access a network of certified and experienced doctors across multiple medical specializations.' },
          { icon: '🔔', title: 'Real-time Status Updates', desc: 'Get instant updates when your appointment is confirmed or cancelled by your doctor.' },
          { icon: '🔒', title: 'Safe & Secure', desc: 'Your personal health data is fully protected with secure login and private account management.' },
          { icon: '💊', title: 'Multiple Specializations', desc: 'Find doctors in Cardiology, Neurology, Dermatology, Pediatrics, Surgery and many more.' },
          { icon: '🌐', title: '24/7 Availability', desc: 'Our platform is always online — book or check your appointments any time of day or night.' },
        ].map(f => (
          <div key={f.title} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: 16 }}>
            <div style={{ fontSize: 22, marginBottom: 6 }}>{f.icon}</div>
            <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4, color: 'white' }}>{f.title}</div>
            <div style={{ color: '#8892b0', fontSize: 12, lineHeight: 1.6 }}>{f.desc}</div>
          </div>
        ))}
      </div>

      {/* How it works */}
      <h3 style={{ fontSize: 16, color: '#00c9a7', marginBottom: 14, textTransform: 'uppercase', letterSpacing: 1 }}>✦ How It Works</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 24 }}>
        {[
          { step: '01', icon: '👤', title: 'Register', desc: 'Create your free patient or doctor account in seconds.' },
          { step: '02', icon: '📋', title: 'Book', desc: 'Choose your doctor and preferred appointment date.' },
          { step: '03', icon: '✅', title: 'Get Confirmed', desc: 'Doctor reviews and confirms your appointment request.' },
        ].map(s => (
          <div key={s.step} style={{ background: 'rgba(0,201,167,0.05)', border: '1px solid rgba(0,201,167,0.12)', borderRadius: 12, padding: 16, textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: '#00c9a7', fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>STEP {s.step}</div>
            <div style={{ fontSize: 24, marginBottom: 6 }}>{s.icon}</div>
            <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4 }}>{s.title}</div>
            <div style={{ color: '#8892b0', fontSize: 11, lineHeight: 1.5 }}>{s.desc}</div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginBottom: 28 }}>
        {[
          ['500+', 'Doctors'],
          ['10,000+', 'Patients'],
          ['98%', 'Satisfaction'],
          ['24/7', 'Support'],
        ].map(([val, label]) => (
          <div key={label} style={{ textAlign: 'center', padding: '14px 8px', background: 'rgba(255,255,255,0.03)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#00c9a7' }}>{val}</div>
            <div style={{ fontSize: 11, color: '#8892b0', marginTop: 3 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ textAlign: 'center' }}>
        <button
          onClick={() => setShowAbout(false)}
          style={{ background: '#00c9a7', color: '#0a1628', border: 'none', borderRadius: 10, padding: '12px 32px', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'sans-serif' }}>
          Get Started Today →
        </button>
      </div>
    </div>
  </div>
)}

      {/* Hero */}
      <div style={{ textAlign: 'center', padding: '80px 24px 60px' }}>
        <div style={{ display: 'inline-block', background: 'rgba(0,201,167,0.1)', border: '1px solid rgba(0,201,167,0.3)', borderRadius: 99, padding: '6px 20px', fontSize: 13, color: '#00c9a7', marginBottom: 24 }}>
          🏥 Smart Healthcare Management System
        </div>
        <h1 style={{ fontSize: 64, fontWeight: 800, marginBottom: 20, lineHeight: 1.1 }}>
          Modern Care
        </h1>
        <p style={{ fontSize: 18, color: '#8892b0', maxWidth: 520, margin: '0 auto 36px', lineHeight: 1.7 }}>
          Book appointments, manage your health records, and connect with doctors — all in one seamless platform.
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 60 }}>
          <Link to="/patient/register" style={{ background: '#00c9a7', color: '#0a1628', padding: '14px 32px', borderRadius: 10, textDecoration: 'none', fontWeight: 700, fontSize: 16 }}>
            Get Started as Patient
          </Link>
          <Link to="/doctor/register" style={{ border: '1.5px solid #00c9a7', color: '#00c9a7', padding: '14px 32px', borderRadius: 10, textDecoration: 'none', fontWeight: 600, fontSize: 16 }}>
            Join as Doctor
          </Link>
        </div>

        {/* Stats */}
        <div style={{ display: 'inline-flex', gap: 48, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(0,201,167,0.15)', borderRadius: 16, padding: '28px 48px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {[['500+', 'Doctors'], ['10k+', 'Patients'], ['98%', 'Satisfaction'], ['24/7', 'Support']].map(([val, label]) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: '#00c9a7' }}>{val}</div>
              <div style={{ fontSize: 13, color: '#8892b0', marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, maxWidth: 1100, margin: '0 auto 60px', padding: '0 24px' }}>
        {[
          { icon: '📅', title: 'Easy Booking', desc: 'Schedule appointments with your preferred doctor in seconds.', color: '#00c9a7' },
          { icon: '🩺', title: 'Expert Doctors', desc: 'Access a wide network of certified and specialized physicians.', color: '#4facfe' },
          { icon: '🔔', title: 'Real-time Updates', desc: 'Get instant confirmations and status updates for appointments.', color: '#f4c543' },
          { icon: '🔒', title: 'Secure & Private', desc: 'Your health data is encrypted and protected at all times.', color: '#ff6b6b' },
        ].map((f) => (
          <div key={f.title} style={{ background: 'rgba(17,34,64,0.7)', border: '1px solid rgba(0,201,167,0.15)', borderRadius: 16, padding: 28 }}>
            <div style={{ width: 52, height: 52, borderRadius: 12, background: `${f.color}18`, color: f.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 12 }}>{f.icon}</div>
            <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 8 }}>{f.title}</div>
            <div style={{ fontSize: 14, color: '#8892b0', lineHeight: 1.6 }}>{f.desc}</div>
          </div>
        ))}
      </div>

      {/* How It Works */}
      <div style={{ maxWidth: 900, margin: '0 auto 80px', padding: '0 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 36, marginBottom: 12 }}>How It Works</h2>
        <p style={{ color: '#8892b0', marginBottom: 40 }}>Get started in 3 simple steps</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
          {[
            { step: '01', title: 'Register', desc: 'Create your patient or doctor account in seconds.' },
            { step: '02', title: 'Book', desc: 'Patient books an appointment with preferred doctor.' },
            { step: '03', title: 'Confirm', desc: 'Doctor reviews and confirms the appointment.' },
          ].map(s => (
            <div key={s.step} style={{ background: 'rgba(17,34,64,0.7)', border: '1px solid rgba(0,201,167,0.15)', borderRadius: 16, padding: 28, textAlign: 'center' }}>
              <div style={{ fontSize: 36, fontWeight: 800, color: 'rgba(0,201,167,0.3)', marginBottom: 12 }}>{s.step}</div>
              <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{s.title}</div>
              <div style={{ color: '#8892b0', fontSize: 14, lineHeight: 1.6 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', padding: 24, borderTop: '1px solid rgba(0,201,167,0.15)', color: '#8892b0', fontSize: 14 }}>
        ⚕ MediCare © 2025 — Built with Spring Boot + React + MySQL
      </div>
    </div>
  );
}