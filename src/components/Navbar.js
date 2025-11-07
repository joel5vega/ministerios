import React, { useState } from 'react';
import './Navbar.css';

export default function Navbar({ onNavigate, user, onLogin, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (section) => {
    onNavigate(section);
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-brand-logo" onClick={() => handleNavClick('home')}>
          <img src="/ministerios/android-chrome-512x512.png" alt="Ministerios Logo" className="brand-logo-img" />
        </div>

        <button 
          className="navbar-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          ☰
        </button>
        <ul className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          <li onClick={() => handleNavClick('home')}>Inicio</li>
          <li onClick={() => handleNavClick('ministries')}>Explorar</li>
          <li onClick={() => handleNavClick('add')}>Agregar</li>
        </ul>

        <div className="navbar-auth">
  {!user ? (
    <button className="navbar-login-btn" onClick={onLogin}>
      <img src="/ministerios/google-icon.svg" className="login-icon" alt="Google sign in" />
      Iniciar sesión
    </button>
  ) : (
    <>
      <img
        src={user.photoURL || "/default-avatar.png"}
        alt="Perfil"
        className="navbar-avatar"
        height={34}
        width={34}
        onClick={() => handleNavClick('profile')}
        title={user.displayName || "Profile"}
        style={{ cursor: "pointer" }}
      />
      <button
        className="navbar-logout-btn"
        onClick={onLogout}
        title="Cerrar sesión"
        style={{
          marginLeft: 8,
          background: "none",
          border: "none",
          color: "#fff",
          fontSize: "1.15em",
          cursor: "pointer",
          padding: "0 12px",
          borderRadius: "8px"
        }}
      >
        ⎋
      </button>
    </>
  )}
</div>

      </div>
    </nav>
  );
}
