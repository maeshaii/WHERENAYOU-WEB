import React, { useState } from 'react';
import './Tracker.css';

function Responses() {
  const [activeTab, setActiveTab] = useState('summary');
  const [accepting, setAccepting] = useState(true);

  const responses = [
    { name: 'User 1', answers: ['Yes', 'Option B'] },
    { name: 'User 2', answers: ['No', 'Option A'] },
  ];

  const summaryData = [
    {
      question: 'Question 1',
      options: [
        { label: 'Yes', percent: 60 },
        { label: 'No', percent: 40 },
      ],
    },
    {
      question: 'Question 2',
      options: [
        { label: 'Option A', percent: 30 },
        { label: 'Option B', percent: 70 },
      ],
    },
  ];

  return (
    <div className="tracker-container">
      <div className="tracker-inner">
        {/* Header */}
        <div className="card response-header-card">
          <div className="response-header">
            <h3>No. of Responses</h3>
            <button
              className={`toggle-button ${accepting ? 'active' : 'inactive'}`}
              onClick={() => setAccepting(!accepting)}
            >
              {accepting ? 'Accepting Responses' : 'Not Accepting'}
            </button>
          </div>

          {/* Tabs */}
          <div className="response-tabs">
            <button
              className={activeTab === 'summary' ? 'active' : ''}
              onClick={() => setActiveTab('summary')}
            >
              Summary
            </button>
            <button
              className={activeTab === 'view' ? 'active' : ''}
              onClick={() => setActiveTab('view')}
            >
              View Responses
            </button>
          </div>
        </div>

        {/* Summary Tab */}
        {activeTab === 'summary' &&
          summaryData.map((q, index) => (
            <div key={index} className="card">
              <h3>{q.question}</h3>
              {q.options.map((opt, idx) => (
                <div key={idx} className="bar-group">
                  <span>{opt.label}: {opt.percent}%</span>
                  <div className="bar-container">
                    <div
                      className="bar-fill"
                      style={{ width: `${opt.percent}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          ))
        }

        {/* View Responses Tab */}
        {activeTab === 'view' &&
          responses.map((res, idx) => (
            <div key={idx} className="card">
              <h3>{res.name}</h3>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Responses;
