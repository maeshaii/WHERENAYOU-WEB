import React from 'react';
import './Tracker.css';
import { useLocation } from 'react-router-dom';

function Question() {
  const location = useLocation();

  return (
    <div className="tracker-container">
      <div className="tracker-inner">
        {/* Form Description */}
        <div className="card form-description">
          <h3>Form Description</h3>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          </p>
        </div>

        {/* Question Cards */}
        <div className="card question-box">
          <h3>Question 1</h3>
          <p>No. of Response</p>
        </div>

        <div className="card question-box">
          <h3>Question 1</h3>
          <p>No. of Response</p>
        </div>
      </div>
    </div>
  );
}

export default Question;
