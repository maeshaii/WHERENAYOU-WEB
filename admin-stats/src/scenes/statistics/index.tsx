import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from 'recharts';
import Sidebar from '../global/sidebar.tsx';

type EmploymentData = {
  category: string;
  count: number;
};

const yearOptions = ['ALL','2024', '2023', '2022', '2021', '2020'];
const courseOptions = ['ALL','BSIT', 'BSIS', 'BIT-CT'];

const initialData: EmploymentData[] = [
  { category: 'Employed', count: 1350 },
  { category: 'Unemployed', count: 950 },
  { category: 'Absorb', count: 1250 },
  { category: 'High Position', count: 950 },
];

const barColors: Record<string, string> = {
  Employed: '#7C97A4',
  Unemployed: '#1F4B7A',
  Absorb: '#A3D9DF',
  'High Position': '#0797D8',
};

export default function Statistics() {
  const [selectedYear, setSelectedYear] = useState('ALL');
  const [selectedCourse, setSelectedCourse] = useState('ALL');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const data = initialData;

  const maxCount = Math.max(...data.map(d => d.count));
  const maxTick = Math.ceil(maxCount / 200) * 200;
  const ticks = Array.from({ length: maxTick / 200 + 1 }, (_, i) => i * 200);

  return (
    <div style={{ display: 'flex', height: '100vh', position: 'relative' }}>
      <Sidebar />

      <div style={{ padding: '24px', fontFamily: 'Arial, sans-serif', flex: 1, position: 'relative' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>Statistics</h2>

        {/* Filters */}
        <div className="filter-container">
          <div className="filter-group">
            <label className="filter-label">Year:</label>
            <select
              className="filter-select"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              {yearOptions.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Course:</label>
            <select
              className="filter-select"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              {courseOptions.map((course) => (
                <option key={course} value={course}>{course}</option>
              ))}
            </select>
          </div>

          {/* Buttons aligned to right */}
          <div className="filter-buttons">
            <button
              className="action-button"
              onClick={() => setShowModal(true)}
            >
              Import Data
            </button>
            <button
              className="action-button"
              onClick={() => navigate('/ViewStats')}
            >
              View Statistics
            </button>
          </div>
        </div>

        {/* Bar Chart */}
        <div style={{ width: '100%', height: '600px', marginTop: '24px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis domain={[0, maxTick]} ticks={ticks} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" name="Statistics" radius={[5, 5, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={barColors[entry.category]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Modal */}
        {showModal && (
          <>
            <div className="modal-overlay" onClick={() => setShowModal(false)} />
            <div className="modal modal-centered">
              <h2 style={{ marginTop: 0 }}>Import Data</h2>
              <div className="modal-group">
                <label>Batch Graduated:</label>
                <input type="text" placeholder="Enter batch (e.g., 2023)" />
              </div>
              <div className="modal-group">
                <label>Course:</label>
                <select>
                  <option value="">Select course</option>
                  {courseOptions.filter(c => c !== 'ALL').map(course => (
                    <option key={course} value={course}>{course}</option>
                  ))}
                </select>
              </div>
              <div className="modal-group">
                <label>Upload File:</label>
                <input type="file" />
              </div>
              <div className="modal-actions">
                <button onClick={() => setShowModal(false)}>Cancel</button>
                <button style={{ backgroundColor: '#1D4E89', color: '#fff' }}>Submit</button>
              </div>
            </div>
          </>
        )}

        {/* Embedded CSS */}
        <style>{`
          .filter-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 16px;
            margin-bottom: 16px;
          }

          .filter-group {
            display: flex;
            flex-direction: column;
          }

          .filter-label {
            margin-bottom: 4px;
            font-size: 14px;
          }

          .filter-select {
            padding: 6px 10px;
            font-size: 14px;
            border: 1px solid #ccc;
            border-radius: 4px;
          }

          .filter-buttons {
            display: flex;
            gap: 12px;
            margin-left: auto;
          }

          .action-button {
            padding: 10px 20px;
            background-color: #1D4E89;
            color: #fff;
            border-radius: 20px;
            border: none;
            font-weight: bold;
            font-size: 14px;
            cursor: pointer;
            transition: background-color 0.2s;
          }

          .action-button:hover {
            background-color: #163b66;
          }

          .modal-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background-color: rgba(0,0,0,0.5);
            z-index: 1000;
          }

          .modal-centered {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: white;
            padding: 32px;
            border-radius: 10px;
            z-index: 1001;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            width: 500px;
            max-width: 90%;
          }

          .modal-group {
            margin-bottom: 20px;
          }

          .modal-group label {
            display: block;
            margin-bottom: 6px;
            font-weight: bold;
            font-size: 14px;
          }

          .modal-group input,
          .modal-group select {
            width: 100%;
            padding: 10px;
            font-size: 14px;
            border: 1px solid #ccc;
            border-radius: 6px;
          }

          .modal-actions {
            display: flex;
            justify-content: flex-end;
            gap: 12px;
          }

          .modal-actions button {
            padding: 10px 18px;
            border: none;
            border-radius: 6px;
            font-weight: bold;
            cursor: pointer;
          }

          .modal-actions button:first-child {
            background-color: #ccc;
            color: #000;
          }
        `}</style>
      </div>
    </div>
  );
}
