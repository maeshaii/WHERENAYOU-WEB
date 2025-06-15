// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';

const users = [
  {
    id: 1,
    name: 'Harley Dave Chavez',
    idNumber: '1337564',
    course: 'BSIT',
    batch: '04/20/2024',
    status: 'Employed',
    type: 'OJT'
  },
  {
    id: 2,
    name: 'Clien James Taneo',
    idNumber: '1238573',
    course: 'BSIS',
    batch: '04/20/2024',
    status: 'Unemployed',
    type: 'ALUMNI',
    gender: 'Male',
    birthDate: '2000-01-01',
    email: 'clien.taneo@example.com',
    phoneNumber: '09123456789',
    address: 'Tagum City',
    jobStatus: 'Unemployed',
    company: 'N/A',
    position: 'N/A',
    industry: 'N/A'
  },
  {
    id: 3,
    name: 'Rolino Ongco Jr.',
    idNumber: '5678990',
    course: 'BSIT',
    batch: '04/20/2024',
    status: 'Employed',
    type: 'OJT'
  }
];

function Dashboard() {
  return (
    <div className="main-content">
      <h1>📊 Dashboard</h1>
      <p>Welcome to the admin dashboard.</p>
    </div>
  );
}

function Users() {
  const [filter, setFilter] = useState('All');
  const [viewList, setViewList] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [showImportModal, setShowImportModal] = useState(false);
  const [importForm, setImportForm] = useState({
    course: '',
    batch: '',
    file: ''
  });

  const handleImportChange = (e) => {
    const { name, value } = e.target;
    setImportForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImportSubmit = () => {
    console.log('Imported:', importForm);
    setShowImportModal(false);
    setImportForm({ course: '', batch: '', file: '' });
  };

  const renderUserDetailModal = () => (
    <div className="modal-content styled-modal">
      <h2 className="modal-title">User Profile</h2>
      <div className="detail-grid">
        <label>Name</label><input value={selectedUser.name} readOnly />
        <label>Gender</label><input value={selectedUser.gender || 'N/A'} readOnly />
        <label>Birth Date</label><input value={selectedUser.birthDate || 'N/A'} readOnly />
        <label>Email</label><input value={selectedUser.email || 'N/A'} readOnly />
        <label>Phone Number</label><input value={selectedUser.phoneNumber || 'N/A'} readOnly />
        <label>Address</label><input value={selectedUser.address || 'N/A'} readOnly />
      </div>
      <h2 className="modal-title">Employment Information</h2>
      <div className="detail-grid">
        <label>Current Job Status</label><input value={selectedUser.jobStatus || 'N/A'} readOnly />
        <label>Company</label><input value={selectedUser.company || 'N/A'} readOnly />
        <label>Position</label><input value={selectedUser.position || 'N/A'} readOnly />
        <label>Industry</label><input value={selectedUser.industry || 'N/A'} readOnly />
      </div>
      <div className="modal-buttons">
        <button className="cancel-btn" onClick={() => setSelectedUser(null)}>Back</button>
      </div>
    </div>
  );

  const getBatchHeader = () => {
    const batchUser = users.find(
      (user) =>
        user.type === viewList &&
        (selectedCourse === 'All' || user.course === selectedCourse) &&
        (searchTerm === '' || user.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    return batchUser ? batchUser.batch : 'BATCH';
  };

  return (
    <div className="main-content">
      {!viewList && (
        <div className="header">
          <span className="user-icon">👥</span>
          <span className="user-label">User</span>
          <select
            className="dropdown"
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setViewList(null);
            }}
          >
            <option>All</option>
            <option>OJT</option>
            <option>ALUMNI</option>
          </select>
        </div>
      )}

      {viewList && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <button onClick={() => setViewList(null)} className="arrow-back-btn">&lsaquo;</button>
            <h2 style={{ margin: 0 }}>BATCH {getBatchHeader()}</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
            <input
              type="text"
              placeholder="🔍 Search...."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '10px 15px',
                borderRadius: '20px',
                border: '1px solid #ccc',
                width: '220px',
                fontSize: '14px'
              }}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <label style={{ fontWeight: 'bold' }}>COURSE:</label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  backgroundColor: '#4F7CFE',
                  color: 'white',
                  fontWeight: 'bold',
                  border: 'none',
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
        </div>
      )}

      {viewList ? (
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
            {users
              .filter(
                (user) =>
                  user.type === viewList &&
                  (selectedCourse === 'All' || user.course === selectedCourse) &&
                  (searchTerm === '' || user.name.toLowerCase().includes(searchTerm.toLowerCase()))
              )
              .map((user, index) => (
                <tr
                  key={user.id}
                  onClick={() => viewList === 'ALUMNI' && setSelectedUser(user)}
                  style={{ cursor: viewList === 'ALUMNI' ? 'pointer' : 'default' }}
                >
                  <td>{String(index + 1).padStart(2, '0')}</td>
                  <td>{user.name}</td>
                  <td>{user.idNumber}</td>
                  <td>{user.course}</td>
                  <td>{user.batch}</td>
                  <td style={{ color: user.status === 'Employed' ? 'teal' : 'orangered' }}>{user.status}</td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <div className="card-container">
          {users
            .filter((user) => filter === 'All' || user.type === filter)
            .map((user) => (
              <div
                className="card"
                key={user.id}
                onClick={() => setViewList(user.type)}
                style={{ cursor: 'pointer' }}
              >
                <div className="card-image" />
                <div className="card-text">
                  <strong>YEAR GRADUATED: {user.batch}</strong>
                  <p>Imported</p>
                </div>
              </div>
            ))}
          <button className="fab" onClick={() => setShowImportModal(true)}>+</button>
        </div>
      )}

      {showImportModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2 className="modal-title">Import Alumni Data</h2>
            <label>Course</label>
            <input name="course" value={importForm.course} onChange={handleImportChange} />
            <label>Batch Graduated</label>
            <input name="batch" value={importForm.batch} onChange={handleImportChange} />
            <label>Upload File</label>
            <input name="file" value={importForm.file} onChange={handleImportChange} />
            <div className="modal-buttons">
              <button className="add-btn" onClick={handleImportSubmit}>Add</button>
              <button className="cancel-btn" onClick={() => setShowImportModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {selectedUser && (
        <div className="modal-backdrop">
          <div className="modal">{renderUserDetailModal()}</div>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="main-layout">
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
 
