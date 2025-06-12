import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink
} from 'react-router-dom';
import './App.css';

const users = [
  { id: 1, name: 'Jay Park', idNumber: '1337564', course: 'BSIT', batch: '04/20/2024', status: 'Employed', type: 'OJT' },
  { id: 2, name: 'Jay Park', idNumber: '1238573', course: 'BSIS', batch: '04/20/2024', status: 'Unemployed', type: 'ALUMNI' },
  { id: 3, name: 'Jay Park', idNumber: '5678990', course: 'BSIT', batch: '04/20/2024', status: 'Employed', type: 'OJT' },
];

function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Welcome, Admin!</h1>
      <p>This is your dashboard where you can manage the system.</p>
    </div>
  );
}

function Users() {
  const [filter, setFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('All');

  let filteredUsers = [];
  if (filter === 'All') {
    filteredUsers = users;
  } else {
    filteredUsers = users.filter((user) => {
      const matchType = user.type === filter;
      const matchSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCourse = selectedCourse === 'All' || user.course === selectedCourse;
      return matchType && matchSearch && matchCourse;
    });
  }

  const isFABVisible = filter === 'All' || filter === 'ALUMNI';

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

      {(filter === 'OJT' || filter === 'ALUMNI') && (
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="🔍 Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '10px 15px',
              borderRadius: '20px',
              border: '1px solid #ccc',
              width: '200px'
            }}
          />
          <div>
            <label style={{ fontWeight: 'bold', marginRight: '8px' }}>COURSE:</label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              style={{
                padding: '6px 12px',
                borderRadius: '12px',
                border: '1px solid #ccc',
                backgroundColor: '#4F7CFE',
                color: 'white',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              <option>All</option>
              <option>BSIT</option>
              <option>BSIS</option>
              <option>BIT-CT</option>
            </select>
          </div>
        </div>
      )}

      {filter === 'All' ? (
        <div className="card-container">
          {filteredUsers.map((user) => (
            <div className="card" key={user.id}>
              <div className="card-image" />
              <div className="card-text">
                <strong>YEAR GRADUATED: {user.batch}</strong>
                <p>{user.source || 'Imported'}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>ID Number</th>
              <th>Course</th>
              <th>Batch Graduated</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user.id}>
                <td>{String(index + 1).padStart(2, '0')}</td>
                <td>{user.name}</td>
                <td>{user.idNumber}</td>
                <td>{user.course}</td>
                <td>{user.batch}</td>
                <td style={{ color: user.status === 'Employed' ? 'teal' : 'orangered' }}>
                  {user.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isFABVisible && (
        <>
          <button className="fab" onClick={() => setShowModal(true)}>+</button>

          {showModal && (
            <div className="modal-backdrop">
              <div className="modal">
                {filter === 'ALUMNI' ? (
                  <>
                    <h2>User Profile</h2>
                    <input type="text" placeholder="Name" />
                    <input type="text" placeholder="Gender" />
                    <input type="date" placeholder="Birth Date" />
                    <input type="email" placeholder="Email" />
                    <input type="tel" placeholder="Phone Number" />
                    <input type="text" placeholder="Address" />

                    <h2>Employment Information</h2>
                    <input type="text" placeholder="Current Job Status" />
                    <input type="text" placeholder="Company" />
                    <input type="text" placeholder="Position" />
                    <input type="text" placeholder="Industry" />
                  </>
                ) : (
                  <>
                    <h2>Import Alumni Data</h2>
                    <input type="text" placeholder="Course" />
                    <input type="text" placeholder="Batch Graduated" />
                    <input type="file" />
                  </>
                )}

                <div className="modal-buttons">
                  <button className="add-btn">Add</button>
                  <button className="cancel-btn" onClick={() => setShowModal(false)}>Back</button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

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
