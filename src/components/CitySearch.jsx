// src/components/CitySearch.jsx

import React, { useState, useEffect } from 'react';

const CitySearch = ({ allLocations, setCurrentCity, setInfoAlert, setErrorAlert }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    const filteredLocations = allLocations
      ? allLocations.filter((location) =>
          location.toUpperCase().indexOf(value.toUpperCase()) > -1
        )
      : [];
    setQuery(value);
    setSuggestions(filteredLocations);

    if (filteredLocations.length === 0) {
      setInfoAlert("");
      setErrorAlert("We can not find the city you are looking for. Please try another city.");
    } else {
      setInfoAlert("");
      setErrorAlert("");
    }
  };

  useEffect(() => {
    setSuggestions(allLocations);
  }, [JSON.stringify(allLocations)]);


  const handleItemClicked = (event) => {
    const value = event.target.textContent;
    setQuery(value);
    setShowSuggestions(false); // hide the list after selection
    setCurrentCity(value);
  };

  return (
    <div id="city-search">
      <input
        type="text"
        className="city"
        placeholder="Search for a city"
        value={query}
        onFocus={() => setShowSuggestions(true)}
        onChange={handleInputChanged}
      />
      {showSuggestions ? 
        <ul className="suggestions">
          {suggestions.map((suggestion) => (
            <li onClick={handleItemClicked} key={suggestion}>{suggestion}</li>
          ))}
          <li onClick={handleItemClicked} key='See all cities'>
            <b>See all cities</b>
          </li>
        </ul> 
        : null
      }
    </div>
  );
}

export default CitySearch;