import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <img src="/path/to/logo.png" alt="Logo" className="navbar__logo" />
      <input type="text" placeholder="Search" className="navbar__search" />
      <div className="navbar__icons">
        {/* Icons go here */}
      </div>
    </div>
  );
}

export default Navbar;
