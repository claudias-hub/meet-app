// src/components/NumberOfEvents.jsx
import React, { useState } from 'react';

const NumberOfEvents = ({ number, onNumberChange }) => {
  // If you want to manage state here, you can use useState:
  const [value, setValue] = useState(number || 32);

  const handleInputChanged = (event) => {
    const inputValue = event.target.value;
    // If the input is empty, set value to empty string
    if (inputValue === '') {
      setValue('');
      if (onNumberChange) onNumberChange('');
      return;
    }
    const newValue = parseInt(inputValue, 10);
    setValue(newValue);
    if (onNumberChange) onNumberChange(newValue);
  };

  return (
    <div id="number-of-events">
      <label htmlFor="number-input">Number of Events:</label>
      <input
        id="number-input"
        type="number"
        value={value=== '' ? '' : value}
        onChange={handleInputChanged}
        role="spinbutton"
      />
    </div>
  );
};

export default NumberOfEvents;