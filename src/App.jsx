// src/App.jsx

import React, { useState, useEffect } from "react";
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';
import { extractLocations, getEvents } from './api';
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert';
import './App.css';
import CityEventsChart from './components/CityEventsChart';
import EventGenresChart from './components/EventGenresChart';


const App = () => {
  const [allLocations, setAllLocations] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [events, setEvents] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [warningText, setWarningText] = useState('');

  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents = currentCity === "See all cities"
      ? allEvents
      : allEvents.filter(event => event.location === currentCity);
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  };

  useEffect(() => {
      // A.  Online/offline flag
    if (navigator.onLine) {
      setWarningText(''); // clear message
    } else {
      setWarningText('You are offline – events shown are from your last visit.');
    }

    // B.  Fetch (will pull from network or cache)
    fetchData();
  }, [currentCity, currentNOE]);

  useEffect(() => {
    const goOnline  = () => setWarningText('');
    const goOffline = () => setWarningText('You are offline – events shown are from your last visit.');

    window.addEventListener('online',  goOnline);
    window.addEventListener('offline', goOffline);

    return () => {
      window.removeEventListener('online',  goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  return (
    <div className="App">
      <h1>Meet App</h1>
      <div className="alerts-container">
        {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
        {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
        {warningText.length ? <WarningAlert text={warningText} /> : null}
      </div>
      <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} setInfoAlert={setInfoAlert} setErrorAlert={setErrorAlert}/>
      <NumberOfEvents currentNOE={currentNOE} setCurrentNOE={setCurrentNOE} setInfoAlert={setInfoAlert} setErrorAlert={setErrorAlert}/>
      <div className="charts-container">
        <CityEventsChart allLocations={allLocations} events={events} />
        <EventGenresChart events={events} />
      </div>
      
      <EventList events={events} />
      
    </div>
  );
}

export default App;
