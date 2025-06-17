import React, { useState } from 'react';
import { filterUsers } from './utils';
import { FaPen, FaTrash } from 'react-icons/fa';
import './user.css';

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

const Users = () => {
  const [filter, setFilter] = useState('All');
  const [viewList, setViewList] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [showImportModal, setShowImportModal] = useState(false);
  const [importForm, setImportForm] = useState({ course: '', batch: '', file: '' });

  const handleImportChange = (e) => {
    const { name, value } = e.target;
    setImportForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImportSubmit = () => {
    console.log('Imported:', importForm);
    setShowImportModal(false);
    setImportForm({ course: '', batch: '', file: '' });
  };

  const renderUserEditModal = () => (
    <div className="modal-content styled-modal">
      <h2 className="modal-title">Edit User</h2>
      <div className="detail-grid">
        <label>Name</label>
        <input value={selectedUser.name} onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })} />
        <label>Gender</label>
        <select value={selectedUser.gender || ''} onChange={(e) => setSelectedUser({ ...selectedUser, gender: e.target.value })}>
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <label>Birth Date</label>
        <input type="date" value={selectedUser.birthDate || ''} onChange={(e) => setSelectedUser({ ...selectedUser, birthDate: e.target.value })} />
        <label>Email</label>
        <input value={selectedUser.email || ''} onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })} />
        <label>Phone Number</label>
        <input value={selectedUser.phoneNumber || ''} onChange={(e) => setSelectedUser({ ...selectedUser, phoneNumber: e.target.value })} />
        <label>Address</label>
        <input value={selectedUser.address || ''} onChange={(e) => setSelectedUser({ ...selectedUser, address: e.target.value })} />
      </div>
      <h2 className="modal-title">Employment Info</h2>
      <div className="detail-grid">
        <label>Job Status</label>
        <select value={selectedUser.jobStatus || ''} onChange={(e) => setSelectedUser({ ...selectedUser, jobStatus: e.target.value })}>
          <option value="">Select</option>
          <option value="Employed">Employed</option>
          <option value="Unemployed">Unemployed</option>
        </select>
        <label>Company</label>
        <input value={selectedUser.company || ''} onChange={(e) => setSelectedUser({ ...selectedUser, company: e.target.value })} />
        <label>Position</label>
        <input value={selectedUser.position || ''} onChange={(e) => setSelectedUser({ ...selectedUser, position: e.target.value })} />
        <label>Industry</label>
        <input value={selectedUser.industry || ''} onChange={(e) => setSelectedUser({ ...selectedUser, industry: e.target.value })} />
      </div>
      <div className="modal-buttons">
        <button className="add-btn" onClick={() => alert('Changes saved!')}>Save</button>
        <button className="cancel-btn" onClick={() => setSelectedUser(null)}>Cancel</button>
      </div>
    </div>
  );

  return (
    <div className="main-content">
      {!viewList && (
        <div className="header">
          <span className="user-icon">👥</span>
          <span className="user-label">User</span>
          <select className="dropdown" value={filter} onChange={(e) => {
            setFilter(e.target.value);
            setViewList(null);
          }}>
            <option>All</option>
            <option>OJT</option>
            <option>ALUMNI</option>
          </select>
        </div>
      )}

      {viewList && (
        <div className="table-header">
          <div className="table-left">
            <button onClick={() => setViewList(null)} className="arrow-back-btn">&lsaquo;</button>
            <h2>BATCH 2025</h2>
          </div>
          <div className="table-right">
            <input
              type="text"
              placeholder="🔍 Search...."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="course-filter">
              <label>COURSE:</label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
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
            {filterUsers(users, viewList, selectedCourse, searchTerm).map((user, index) => (
              <tr key={user.id}>
                <td>{String(index + 1).padStart(2, '0')}</td>
                <td>{user.name}</td>
                <td>{user.idNumber}</td>
                <td>{user.course}</td>
                <td>{user.batch}</td>
                <td>
                  <div className="status-cell">
                    <span className={`status-text ${user.status === 'Employed' ? 'employed' : 'unemployed'}`}>
                      {user.status}
                    </span>
                    <div className="action-buttons">
                      <FaPen className="icon-btn" title="Edit" onClick={() => setSelectedUser({ ...user })} />
                      <FaTrash className="icon-btn" title="Delete" onClick={() => setUserToDelete(user)} />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="card-container">
          {users
            .filter(user => filter === 'All' || user.type === filter)
            .map((user) => (
              <div
                className="card"
                key={user.id}
                onClick={() => setViewList(user.type)}
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
          <div className="modal">{renderUserEditModal()}</div>
        </div>
      )}

      {userToDelete && (
        <div className="modal-backdrop">
          <div className="delete-modal">
            <h3>Are you sure you want to delete this user?</h3>
            <div className="delete-modal-buttons">
              <button className="confirm-delete" onClick={() => setUserToDelete(null)}>Delete</button>
              <button className="cancel-delete" onClick={() => setUserToDelete(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
