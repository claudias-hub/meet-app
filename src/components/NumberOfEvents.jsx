// src/components/NumberOfEvents.jsx
import React from 'react';

const NumberOfEvents = ({ currentNOE, setCurrentNOE }) => {

  const handleInputChanged = (event) => {
    const inputValue = event.target.value;
    // If the input is empty, set value to empty string
    if (inputValue === '') {
      setCurrentNOE('');
      return;
    }
    setCurrentNOE(Number(inputValue));
  };

  return (
    <div id="number-of-events" className="number-of-events">
      <label htmlFor="number-input">Number of Events:</label>
      <input
        id="number-input"
        type="number"
        value={currentNOE === '' ? '' : currentNOE}
        onChange={handleInputChanged}
        role="spinbutton"
      />
    </div>
  );
};

export default NumberOfEvents;