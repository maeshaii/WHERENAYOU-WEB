import React, { useState, ChangeEvent } from 'react';
import Sidebar from '../global/sidebar.tsx';

interface User {
  id: number;
  name: string;
  idNumber: string;
  course: string;
  batch: string;
  status: string;
  type: 'OJT' | 'ALUMNI';
  gender?: string;
  birthDate?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  jobStatus?: string;
  company?: string;
  position?: string;
  industry?: string;
}

interface ImportForm {
  course: string;
  batch: string;
  file: File | string;
}

const users: User[] = [
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

const Users: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'OJT' | 'ALUMNI'>('All');
  const [viewList, setViewList] = useState<'OJT' | 'ALUMNI' | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [showImportModal, setShowImportModal] = useState(false);
  const [importForm, setImportForm] = useState<ImportForm>({
    course: '',
    batch: '',
    file: ''
  });

  const handleImportChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setImportForm((prev) => ({
      ...prev,
      [name]: name === 'file' ? (files?.[0] || '') : value
    }));
  };

  const handleImportSubmit = () => {
    console.log('Imported:', importForm);
    setShowImportModal(false);
    setImportForm({ course: '', batch: '', file: '' });
  };

  const getBatchHeader = () => {
    const batchUser = users.find(
      (user) =>
        user.type === viewList &&
        (selectedCourse === 'All' || user.course === selectedCourse) &&
        (searchTerm === '' || user.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    return batchUser ? batchUser.batch : 'BATCH';
  };

  const renderUserDetailModal = () => (
    <div className="modal-content styled-modal">
      <h2 className="modal-title">User Profile</h2>
      <div className="detail-grid">
        <label>Name</label><input value={selectedUser?.name || ''} readOnly />
        <label>Gender</label><input value={selectedUser?.gender || 'N/A'} readOnly />
        <label>Birth Date</label><input value={selectedUser?.birthDate || 'N/A'} readOnly />
        <label>Email</label><input value={selectedUser?.email || 'N/A'} readOnly />
        <label>Phone Number</label><input value={selectedUser?.phoneNumber || 'N/A'} readOnly />
        <label>Address</label><input value={selectedUser?.address || 'N/A'} readOnly />
      </div>
      <h2 className="modal-title">Employment Information</h2>
      <div className="detail-grid">
        <label>Current Job Status</label><input value={selectedUser?.jobStatus || 'N/A'} readOnly />
        <label>Company</label><input value={selectedUser?.company || 'N/A'} readOnly />
        <label>Position</label><input value={selectedUser?.position || 'N/A'} readOnly />
        <label>Industry</label><input value={selectedUser?.industry || 'N/A'} readOnly />
      </div>
      <div className="modal-buttons">
        <button className="cancel-btn" onClick={() => setSelectedUser(null)}>Back</button>
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        .main-content {
          flex-grow: 1;
          padding: 20px 40px 40px;
          background-color: #f5f7fa;
          overflow-y: auto;
        }
        .fab {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: black;
          color: white;
          font-size: 32px;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }
        .header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 25px;
        }
        .user-icon {
          font-size: 24px;
        }
        .user-label {
          font-weight: bold;
          font-size: 18px;
        }
        .dropdown {
          padding: 5px 10px;
          border-radius: 6px;
          border: 1px solid #ccc;
        }
        .batch-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 20px;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }
        .search-input {
          padding: 10px 15px;
          border-radius: 20px;
          border: 1px solid #ccc;
          width: 220px;
          font-size: 14px;
        }
        .course-filter {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: bold;
        }
        .course-dropdown {
          padding: 8px 16px;
          border-radius: 20px;
          background-color: #4F7CFE;
          color: white;
          font-weight: bold;
          border: none;
          cursor: pointer;
        }
        .arrow-back-btn {
          font-size: 32px;
          color: black;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          line-height: 1;
        }
        .arrow-back-btn:hover {
          color: #333;
        }
        .card-container {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }
        .card {
          width: 220px;
          border-radius: 20px;
          overflow: hidden;
          background-color: white;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
          transition: transform 0.2s ease;
          cursor: pointer;
        }
        .card:hover {
          transform: translateY(-4px);
        }
        .card-image {
          height: 120px;
          background-color: white;
        }
        .card-text {
          background-color: #174f84;
          color: white;
          padding: 15px;
        }
        .card-text strong {
          font-size: 15px;
          display: block;
          margin-bottom: 5px;
        }
        .card-text p {
          margin: 0;
          font-size: 14px;
        }
        .user-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
          background: white;
          border-radius: 12px;
          overflow: hidden;
          font-size: 14px;
        }
        .user-table th,
        .user-table td {
          text-align: left;
          padding: 10px 12px;
          border-bottom: 1px solid #ccc;
        }
        .user-table th {
          background-color: #174f84;
          color: white;
          font-weight: 600;
        }
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modal {
          background: #a9dce3;
          border-radius: 24px;
          padding: 30px;
          width: 420px;
          max-height: 80vh;
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: #888 transparent;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .modal::-webkit-scrollbar {
          width: 8px;
        }
        .modal::-webkit-scrollbar-track {
          background: transparent;
        }
        .modal::-webkit-scrollbar-thumb {
          background-color: #888;
          border-radius: 20px;
          border: 2px solid transparent;
          background-clip: padding-box;
        }
        .modal::-webkit-scrollbar-thumb:hover {
          background-color: #555;
        }
        .modal-title {
          text-align: center;
          font-size: 22px;
          font-weight: bold;
          margin: 20px 0 10px;
        }
        .modal input {
          padding: 10px;
          border-radius: 20px;
          border: 1px solid #ccc;
          font-size: 14px;
        }
        .modal-buttons {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-top: 20px;
        }
        .add-btn {
          padding: 10px 30px;
          font-size: 14px;
          border-radius: 20px;
          cursor: pointer;
          border: none;
          background: #f26c4f;
          color: white;
        }
        .cancel-btn {
          padding: 10px 30px;
          font-size: 14px;
          border-radius: 20px;
          cursor: pointer;
          border: 1px solid #444;
          background: white;
        }
        .styled-modal input {
          padding: 8px 12px;
          border: 1px solid #888;
          border-radius: 20px;
          font-size: 14px;
          background-color: white;
          color: #333;
          width: 100%;
        }
        .detail-grid {
          display: grid;
          grid-template-columns: 140px 1fr;
          gap: 10px 16px;
          margin-bottom: 20px;
          align-items: center;
        }
      `}</style>

      <div className="main-layout" style={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar />

        <div className="main-content">
          {!viewList && (
            <div className="header">
              <span className="user-icon">👥</span>
              <span className="user-label">Users</span>
              <select
                className="dropdown"
                value={filter}
                onChange={(e) => {
                  setFilter(e.target.value as 'All' | 'OJT' | 'ALUMNI');
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
            <div className="batch-toolbar">
              <div className="left">
                <button onClick={() => setViewList(null)} className="arrow-back-btn">&lsaquo;</button>
                <h2 style={{ margin: 0 }}>BATCH {getBatchHeader()}</h2>
              </div>

              <div className="right">
                <input
                  className="search-input"
                  type="text"
                  placeholder="🔍 Search...."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="course-filter">
                  <label>COURSE:</label>
                  <select
                    className="course-dropdown"
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
                  <th>#</th><th>Name</th><th>ID Number</th><th>Course</th><th>Batch Graduated</th><th>Status</th>
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
            <div className="modal-backdrop" onClick={() => setShowImportModal(false)}>
              <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h2 className="modal-title">Import Alumni Data</h2>
                <label>Course</label>
                <input name="course" value={importForm.course} onChange={handleImportChange} />
                <label>Batch Graduated</label>
                <input name="batch" value={importForm.batch} onChange={handleImportChange} />
                <label>Upload File</label>
                <input name="file" type="file" onChange={handleImportChange} />
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
      </div>
    </>
  );
};

export default Users;
