import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink
} from 'react-router-dom';
import './App.css';

const users = [
  { id: 1, status: 'OJT', year: 2024, source: 'Imported' },
  { id: 2, status: 'ALUMNI', year: 2024, source: 'Imported' },
  { id: 3, status: 'OJT', year: 2024, source: 'Imported' },
];

// Dashboard page
function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Welcome, Admin!</h1>
      <p>This is your dashboard where you can manage the system.</p>
    </div>
  );
}

// Users page
function Users() {
  const [filter, setFilter] = useState('All');
  const filteredUsers =
    filter === 'All' ? users : users.filter((user) => user.status === filter);

  return (
    <div className="app">
      <div className="header">
        <span className="user-icon">👥</span>
        <span className="user-label">User</span>
        <select
          className="dropdown"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option>All</option>
          <option>OJT</option>
          <option>ALUMNI</option>
        </select>
      </div>

      <div className="card-container">
        {filteredUsers.map((user) => (
          <div className="card" key={user.id}>
            <div className="card-image" />
            <div className="card-text">
              <strong>YEAR GRADUATED: {user.year}</strong>
              <p>{user.source}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="fab">+</button>
    </div>
  );
}

// Main App with routing
function App() {
  return (
    <Router>
      <div className="main-layout">
        <aside className="sidebar">
          <h2 className="logo">WhereNaYou</h2>
          <ul>
            <li><NavLink to="/" end>Dashboard</NavLink></li>
            <li><NavLink to="/users">Users</NavLink></li>
          </ul>
          <div className="logout">⏏ Logout</div>
        </aside>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}





export default App;
