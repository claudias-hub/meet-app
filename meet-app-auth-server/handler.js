'use strict';


const { google } = require("googleapis");
const calendar = google.calendar("v3");
const SCOPES = ["https://www.googleapis.com/auth/calendar.events.public.readonly"];
const { CLIENT_SECRET, CLIENT_ID, CALENDAR_ID } = process.env;
const redirect_uris = [
 "https://meet-app-flax.vercel.app/"
];


const oAuth2Client = new google.auth.OAuth2(
 CLIENT_ID,
 CLIENT_SECRET,
 redirect_uris[0]
);


module.exports.getAuthURL = async () => {
 /**
  *
  * Scopes array is passed to the `scope` option.
  *
  */
 const authUrl = oAuth2Client.generateAuthUrl({
   access_type: "offline",
   scope: SCOPES,
 });


 return {
   statusCode: 200,
   headers: {
     'Access-Control-Allow-Origin': '*',
     'Access-Control-Allow-Credentials': true,
   },
   body: JSON.stringify({
     authUrl,
   }),
 };
};

module.exports.getAccessToken = async (event) => {
  const code = decodeURIComponent(event.pathParameters.code);

  return new Promise((resolve, reject) => {
    oAuth2Client.getToken(code, (error, response) => {
      if (error) return reject(error);
      return resolve(response);
    });
  })
  .then((results) => ({
    statusCode: 200,
    headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true },
    body: JSON.stringify(results),
  }))
  .catch((error) => ({
    statusCode: 500,
    body: JSON.stringify(error),
  }));
};

module.exports.getCalendarEvents = async (event) => {
  const access_token = decodeURIComponent(event.pathParameters.access_token);
  oAuth2Client.setCredentials({ access_token });

  return new Promise((resolve, reject) => {
    calendar.events.list({
      calendarId: CALENDAR_ID,
      auth: oAuth2Client,
      timeMin: new Date().toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    }, (error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  })
  .then((results) => ({
    statusCode: 200,
    headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true },
    body: JSON.stringify({ events: results.data.items }),
  }))
  .catch((error) => ({
    statusCode: 500,
    body: JSON.stringify(error),
  }));
};
