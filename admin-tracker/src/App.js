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
          {/* Default Tracker entry point */}
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
