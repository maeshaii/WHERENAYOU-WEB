import React, { useState } from 'react';
import './Tracker.css';
import { useLocation } from 'react-router-dom';

function Question() {
  const location = useLocation();

  const [formTitle, setFormTitle] = useState('Untitled Form');
  const [formDescription, setFormDescription] = useState(
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  );

  return (
    <div className="tracker-container">
      <div className="tracker-inner">
        {/* Editable Form Description */}
        <div className="card form-description">
          <input
            type="text"
            className="form-title-input"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            placeholder="Form Title"
          />
          <textarea
            className="form-description-textarea"
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
            placeholder="Form Description"
            rows={3}
          />
        </div>

        {/* Question Cards */}
        <div className="card question-box">
          <h3>Question 1</h3>
          <p>No. of Response</p>
        </div>

        <div className="card question-box">
          <h3>Question 2</h3>
          <p>No. of Response</p>
        </div>
      </div>
    </div>
  );
}

export default Question;
