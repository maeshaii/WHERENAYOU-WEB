import React, { useState } from 'react';
import './Tracker.css';
import { FaPlusCircle } from 'react-icons/fa';
import { Link, useLocation, Routes, Route, Navigate } from 'react-router-dom';
import Question from './Question';
import Responses from './Responses';
import Setting from './Setting';

function Tracker() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const isQuestionPage = location.pathname === '/tracker/questions' || location.pathname === '/tracker';

  // Form title state
  const [formTitle, setFormTitle] = useState('Untitled Form');
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  // Handle edit/submit
  const handleTitleClick = () => setIsEditingTitle(true);
  const handleTitleChange = (e) => setFormTitle(e.target.value);
  const handleTitleBlur = () => setIsEditingTitle(false);
  const handleTitleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setIsEditingTitle(false);
    }
  };

  return (
    <div className="tracker-container">
      {isQuestionPage && (
        <div className="floating-button-group">
          <button className="icon-button"><FaPlusCircle /> Add Question</button>
          <button className="icon-button"><FaPlusCircle /> Add Category</button>
        </div>
      )}

      <div className="tracker-inner">
        {/* Header */}
        <div className="tracker-header">
          {isEditingTitle ? (
            <input
              type="text"
              value={formTitle}
              onChange={handleTitleChange}
              onBlur={handleTitleBlur}
              onKeyDown={handleTitleKeyDown}
              autoFocus
              className="form-title-input"
            />
          ) : (
            <h2 className="form-title" onClick={handleTitleClick} title="Click to edit">
              {formTitle}
            </h2>
          )}

          <div className="tracker-tabs">
            <Link to="/tracker/questions" className={isActive('/tracker/questions') ? 'active' : ''}>Questions</Link>
            <Link to="/tracker/responses" className={isActive('/tracker/responses') ? 'active' : ''}>Responses</Link>
            <Link to="/tracker/settings" className={isActive('/tracker/settings') ? 'active' : ''}>Settings</Link>
          </div>
        </div>

        {/* Tab Content */}
        <Routes>
          <Route index element={<Navigate to="questions" replace />} />
          <Route path="questions" element={<Question />} />
          <Route path="responses" element={<Responses />} />
          <Route path="settings" element={<Setting />} />
        </Routes>
      </div>
    </div>
  );
}

export default Tracker;
