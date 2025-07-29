// src/components/NumberOfEvents.jsx
import React from 'react';

const NumberOfEvents = ({ currentNOE, setCurrentNOE, setErrorAlert }) => {

  const handleInputChanged = (event) => {
    
    const value = event.target.value;
    
  
    if (value === '') {
      setCurrentNOE('');
      setErrorAlert('');
      return;
    }
    if (isNaN(value) || value <= 0) {
      setErrorAlert("Please enter a valid number of events.");
    } else {
      setErrorAlert("");
      setCurrentNOE(Number(value)); // Only update if valid!
    }
  };

  return (
    <div id="number-of-events" className="number-of-events">
      <label htmlFor="number-input">Number of Events:</label>
      <input
        id="number-input"
        type="number"
        value={currentNOE || ''}
        onChange={handleInputChanged}
        role="spinbutton"
      />
    </div>
  );
};

export default NumberOfEvents;