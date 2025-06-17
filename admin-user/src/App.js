// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './dashboard.css';
import './user.css';
import './sidebar.css';

import Users from './user';
import Dashboard from './dashboard';
import Sidebar from './sidebar'; // ✅ Importing the component

function App() {
  return (
    <Router>
      <div className="main-layout">
        <Sidebar /> {/* ✅ Use the Sidebar component */}
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
