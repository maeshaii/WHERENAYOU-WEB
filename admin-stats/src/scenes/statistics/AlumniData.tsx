import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AlumniData: React.FC = () => {
  const { year } = useParams();
  const navigate = useNavigate();

  const alumniList = [
    {
      id: 1,
      program: 'BSIT',
      lastName: 'Valfor',
      firstName: 'Paul Vincent',
      status: 'Employed',
      company: 'Power China Philippines',
      salary: 'Php 20,000 - 30,000',
      postGrad: ''
    },
    {
      id: 2,
      program: 'BSIT',
      lastName: 'Paquibot',
      firstName: 'Alvin',
      status: 'Unemployed',
      company: '',
      salary: '',
      postGrad: ''
    }
  ];

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#17406a', color: 'white', padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={() => navigate(-1)} style={{ backgroundColor: 'transparent', border: 'none', color: 'white', fontSize: '20px', cursor: 'pointer' }}>←</button>
        <h2>Alumni Data</h2>
        <input type="text" placeholder="🔍" style={{ borderRadius: '5px', padding: '5px' }} />
      </div>

      <div style={{ padding: '20px' }}>
        <strong>BATCH {year}</strong>
        <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: '#4f46e5', color: 'white' }}>
            <tr>
              <th>#</th>
              <th>Program Name</th>
              <th>Last Name</th>
              <th>First Name</th>
              <th>Status</th>
              <th>Company / Business</th>
              <th>Salary</th>
              <th>Post Grad</th>
            </tr>
          </thead>
          <tbody>
            {alumniList.map((alumni, index) => (
              <tr key={alumni.id}>
                <td>{String(index + 1).padStart(2, '0')}</td>
                <td>{alumni.program}</td>
                <td>{alumni.lastName}</td>
                <td>{alumni.firstName}</td>
                <td>{alumni.status}</td>
                <td>{alumni.company}</td>
                <td>{alumni.salary}</td>
                <td>{alumni.postGrad}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AlumniData;
