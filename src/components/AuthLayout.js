import React from 'react';
import { Link } from 'react-router-dom';

export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div style={{ background: '#0a1628', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif' }}>
      
      {/* Navbar */}
      <nav style={{ display: 'flex', alignItems: 'center', padding: '20px 40px', borderBottom: '1px solid rgba(0,201,167,0.2)' }}>
        <Link to="/" style={{ fontSize: 22, fontWeight: 700, color: 'white', textDecoration: 'none' }}>
          ⚕ Medi<span style={{ color: '#00c9a7' }}>Care</span>
        </Link>
      </nav>

      {/* Card */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '60px 16px' }}>
        <div style={{ width: '100%', maxWidth: 460, background: 'rgba(17,34,64,0.9)', border: '1px solid rgba(0,201,167,0.15)', borderRadius: 16, padding: 40 }}>
          
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <h2 style={{ fontSize: 28, marginBottom: 8 }}>{title}</h2>
            {subtitle && <p style={{ color: '#8892b0', fontSize: 15 }}>{subtitle}</p>}
          </div>

          {children}

          {footer && (
            <div style={{ textAlign: 'center', marginTop: 24, fontSize: 14, color: '#8892b0', lineHeight: 2 }}>
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}