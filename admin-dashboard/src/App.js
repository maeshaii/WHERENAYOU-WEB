import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Tracker from './components/Tracker';  // <-- updated import

function Dashboard() {
  return (
    <div>
      <h1>Welcome, Admin!</h1>
      <p>This is your dashboard where you can manage the system.</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <aside className="sidebar">
          <h2>Admin Dashboard</h2>
          <nav>
            <ul>
              <li><Link to="/">Dashboard</Link></li>
              <li><Link to="/users">Statistics</Link></li>
              <li><Link to="/reports">Users</Link></li>
              <li><Link to="/tracker">Tracker</Link></li>

            </ul>
          </nav>
        </aside>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<div><h2>Statistics Page</h2></div>} />
            <Route path="/reports" element={<div><h2>Users Page</h2></div>} />
            <Route path="/tracker" element={<Tracker />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
