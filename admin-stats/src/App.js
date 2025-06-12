import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './scenes/dashboard/index.tsx';
import Statistics from "./scenes/statistics/index.tsx"
import ViewStats from "./scenes/statistics/ViewStats.tsx"
import AlumniData from "./scenes/statistics/AlumniData.tsx"


// import other pages like Statistics, Users, etc.

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root URL to /dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Actual routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/ViewStats" element={<ViewStats />} />
        <Route path="/AlumniData/:year" element={<AlumniData />} />


        {/* Add more routes like:
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/users" element={<Users />} />
        etc.
        */}
      </Routes>
    </Router>
  );
}

export default App;
