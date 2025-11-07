import React, { useState } from 'react';
import './Navbar.css';

export default function Navbar({ onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (section) => {
    onNavigate(section);
    setIsOpen(false); // Close mobile menu after click
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <span onClick={() => handleNavClick('home')}>Ministerios</span>
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
      </div>
    </nav>
  );
}