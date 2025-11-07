import React, { useState } from 'react';
import './Navbar.css'; // Keep your existing CSS or adapt as needed

export default function Navbar({ onNavigate, user, onLogin, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (section) => {
    onNavigate(section);
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* LOGO: replace src with your logo path */}
        <div className="navbar-brand-logo" onClick={() => handleNavClick('home')}>
          <img src="/logo192.png" alt="Ministerios Logo" height={36} style={{ verticalAlign: 'middle', cursor: 'pointer' }} />
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
          {user && <li onClick={() => handleNavClick('profile')}>Perfil</li>}
        </ul>
        {/* Auth Controls */}
        <div className="navbar-auth">
          {user ? (
            <button className="navbar-avatar-btn" onClick={onLogout} title="Logout">
              {/* Show avatar if available */}
              <img
                src={user.photoURL || '/default-avatar.png'}
                alt={user.displayName || 'User'}
                className="navbar-avatar"
                height={32}
                width={32}
                style={{ borderRadius: '50%', objectFit: 'cover', verticalAlign: 'middle' }}
              /> 
            </button>
          ) : (
            <button className="navbar-login-btn" onClick={onLogin}>
              <img src="/google-icon.svg" height={18} alt="Google sign in" style={{ verticalAlign: 'middle', marginRight: 6 }} />
              Iniciar sesión
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
