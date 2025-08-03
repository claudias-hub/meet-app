import mockData from './mock-data';

export const extractLocations = (events) => {
  const extractedLocations = events.map((event) => event.location);
  const locations = [...new Set(extractedLocations)];
  return locations;
};

const checkToken = async (accessToken) => {
  // Don't check token if offline
  // if (!navigator.onLine) {
  //   return { error: false }; // Pretend token is valid when offline
  // }

  const response = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  );
  const result = await response.json();
  return result;
};

export const getEvents = async () => {
  if (window.location.href.startsWith("http://localhost")) {
    return mockData;
  }

  // 1. If offline, load from localStorage
  if (!navigator.onLine) {
    const events = localStorage.getItem("lastEvents");
    return events ? JSON.parse(events) : [];
  }

  // 2. If online and on localhost, use mockData and cache it
  // if (window.location.href.startsWith("http://localhost")) {
  //   localStorage.setItem("lastEvents", JSON.stringify(mockData));
  //   return mockData;
  // }

  // 3. If online , fetch from API and save to localStorage
  const token = await getAccessToken();

  if (token) {
    removeQuery();
    const url = "https://2s37uubk4d.execute-api.eu-central-1.amazonaws.com/dev/api/get-events/" + token;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      if (result) {
        // Save events to localStorage for offline use
        localStorage.setItem("lastEvents", JSON.stringify(result.events));
        return result.events;
      } else {
        return null;
      }
    } catch (error) {
      // If there's an error but we have cached events, return those
      const cachedEvents = localStorage.getItem("lastEvents");
      if (cachedEvents) {
        alert("Using cached events due to connection issues.");
        return JSON.parse(cachedEvents);
      }

      alert("Sorry, we couldn't load events. Please check your connection and try again.");
      console.error("Fetch error in getEvents:", error);
      return null;
    }
  }
};

export const getAccessToken = async () => {
  const accessToken = localStorage.getItem('access_token');
  const tokenCheck = accessToken && (await checkToken(accessToken));

  if (!accessToken || tokenCheck.error) {
    await localStorage.removeItem("access_token");
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get("code");
    if (!code) {
      // Replace with your real endpoint!
      const response = await fetch("https://2s37uubk4d.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url");
      const result = await response.json();
      const { authUrl } = result;
      return (window.location.href = authUrl);
    }
    return code && getToken(code);
  }
  return accessToken;
};

const removeQuery = () => {
  let newurl;
  if (window.history.pushState && window.location.pathname) {
    newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname;
    window.history.pushState("", "", newurl);
  } else {
    newurl = window.location.protocol + "//" + window.location.host;
    window.history.pushState("", "", newurl);
  }
};

const getToken = async (code) => {
  const encodeCode = encodeURIComponent(code);
  // Replace with your real endpoint!
  const response = await fetch('https://2s37uubk4d.execute-api.eu-central-1.amazonaws.com/dev/api/token/' + encodeCode);
  const { access_token } = await response.json();
  access_token && localStorage.setItem("access_token", access_token);
  return access_token;
};