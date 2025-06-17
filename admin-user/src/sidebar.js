// sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="logo-circle">
        <div className="logo-text">WhereNa<br />You</div>
      </div>
      <ul>
        <li><NavLink to="/" end>📊 Dashboard</NavLink></li>
        <li><NavLink to="/users">👥 Users</NavLink></li>
        <li><NavLink to="/profile">🧑‍💼 Profile</NavLink></li>
        <li><NavLink to="/tracker">📂 Tracker</NavLink></li>
      </ul>
      <div className="logout">↩ Logout</div>
    </aside>
  );
};

export default Sidebar;
