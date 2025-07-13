import React, { useState } from 'react';

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  const startDate = event.start && event.start.dateTime
    ? new Date(event.start.dateTime)
    : null;

  const endDate = event.end && event.end.dateTime
    ? new Date(event.end.dateTime)
    : null;

  const formatDate = (date) =>
    date
      ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      : '';
 
  const formatTime = (date) =>
    date
      ? date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
      : '';

  return (
    <div className={`event${showDetails ? " show-details" : ""}`}>
      <div className="event-date">
        <div>
          <strong>Start:</strong>
          <br />
          {formatDate(startDate)}<br />
          {formatTime(startDate)}
        </div>
        <div>
          <strong>End:</strong>
          <br />
          {formatDate(endDate)}<br />
          {formatTime(endDate)}
        </div>
      </div>
      <div className="event-main">
        <h2>{event.summary}</h2>
        <h3>{event.location}</h3>
        {showDetails && (
          <div className="details">
            <p><strong>Description:</strong> {event.description || "No description"}</p>
          </div>
        )}
      </div>
      <button
        className="details-btn"
        onClick={() => setShowDetails((prev) => !prev)}
      >
        {showDetails ? "Hide Details" : "Show Details"}
      </button>
    
  </div>
  );
};

export default Event;