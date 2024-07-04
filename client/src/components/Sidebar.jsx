import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <img src="/path/to/profile.jpg" alt="Profile" className="sidebar__profilePic" />
      <div className="sidebar__links">
        {/* Links go here */}
      </div>
    </div>
  );
}

export default Sidebar;
