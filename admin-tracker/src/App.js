import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation
} from 'react-router-dom';
import './App.css';
import Tracker from './components/Tracker';
import {
  FaTachometerAlt,
  FaChartBar,
  FaUsers,
  FaUser,
  FaClipboardList,
  FaSignOutAlt
} from 'react-icons/fa';

function Dashboard() {
  return (
    <div>
      <h1>Welcome, Admin!</h1>
      <p>This is your dashboard where you can manage the system.</p>
    </div>
  );
}

function Layout() {
  const location = useLocation();
  const isTrackerPage = location.pathname.startsWith('/tracker');

  return (
    <div className={`App ${isTrackerPage ? 'tracker-layout' : ''}`}>
      <aside className="sidebar">
        <div className="top-section">
          <div className="logo-circle">
            <span className="logo-text">WhereNa<br />You</span>
          </div>
          <nav>
            <ul>
              <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}><FaTachometerAlt className="icon" /> Dashboard</Link></li>
              <li><Link to="/users" className={location.pathname === '/users' ? 'active' : ''}><FaChartBar className="icon" /> Statistics</Link></li>
              <li><Link to="/reports" className={location.pathname === '/reports' ? 'active' : ''}><FaUsers className="icon" /> Users</Link></li>
              <li><Link to="/profile" className={location.pathname === '/profile' ? 'active' : ''}><FaUser className="icon" /> Profile</Link></li>
              <li><Link to="/tracker" className={location.pathname.startsWith('/tracker') ? 'active' : ''}><FaClipboardList className="icon" /> Tracker</Link></li>
            </ul>
          </nav>
        </div>
        <div className="logout"><FaSignOutAlt className="icon" /> Logout</div>
      </aside>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<div><h2>Statistics Page</h2></div>} />
          <Route path="/reports" element={<div><h2>Users Page</h2></div>} />
          <Route path="/profile" element={<div><h2>Profile Page</h2></div>} />
          <Route path="/tracker/*" element={<Tracker />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
