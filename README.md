# React + Vite

# Meet App

A serverless, progressive web application (PWA) built with React using test-driven development (TDD). The app uses the Google Calendar API to fetch and display upcoming events.

## Features

### Feature 1: Filter Events By City
**User Stories:**
- As a **user**, I want to **see all upcoming events when I haven't searched for a specific city** so that **I can browse all available events**
- As a **user**, I want to **see city suggestions when I start typing** so that **I can easily select the right city**
- As a **user**, I want to **select a city from the suggested list** so that **I can view events for that specific location**

**Scenarios:**
```
Scenario 1: When user hasn't searched for a city, show upcoming events from all cities
Given: I haven't searched for any city
When: I open the app
Then: I see upcoming events from all cities

Scenario 2: User should see a list of suggestions when they search for a city
Given: I am on the main page
When: I start typing in the city search box
Then: I see a list of city suggestions that match my input

Scenario 3: User can select a city from the suggested list
Given: I see a list of suggested cities
When: I click on one of the suggestions
Then: The city is selected and I see events for that city only
```

### Feature 2: Show/Hide Event Details
**User Stories:**
- As a **user**, I want to **expand an event** so that **I can see more details about it**
- As a **user**, I want to **collapse an event** so that **I can hide details and have a cleaner view**

**Scenarios:**
```
Scenario 1: An event element is collapsed by default
Given: I am viewing the events list
When: The page loads
Then: All events are displayed in collapsed state (no details visible)

Scenario 2: User can expand an event to see details
Given: I am viewing a collapsed event
When: I click on the "Details" button
Then: The event expands and shows detailed information

Scenario 3: User can collapse an event to hide details
Given: I am viewing an expanded event with details
When: I click the collapse button
Then: The details are hidden and the event returns to collapsed state
```

### Feature 3: Specify Number of Events
**User Stories:**
- As a **user**, I want to **specify how many events to display** so that **I can control the amount of information shown**
- As a **user**, I want **32 events shown by default** so that **I see a reasonable amount without specifying anything**

**Scenarios:**
```
Scenario 1: When user hasn't specified a number, 32 events are shown by default
Given: I open the application for the first time
When: I don't specify how many events I want to see
Then: 32 events are displayed automatically

Scenario 2: User can change the number of events displayed
Given: I am viewing the events list
When: I change the number in the "Number of events" field
Then: The list updates to show exactly that number of events
```

### Feature 4: Use the App When Offline
**User Stories:**
- As a **user**, I want to **view cached events when offline** so that **I can use the app without internet connection**
- As a **user**, I want to **receive error messages when trying to change settings offline** so that **I understand why certain actions don't work**

**Scenarios:**
```
Scenario 1: Show cached data when there's no internet connection
Given: I have used the app before and now I'm offline
When: I open the application
Then: I see previously cached events

Scenario 2: Show error when user changes search settings (city, number of events)
Given: I have no internet connection
When: I try to change the city or number of events
Then: An error message appears explaining I need internet for that action
```

### Feature 5: Add an App Shortcut to the Home Screen
**User Story:**
- As a **user**, I want to **install the app on my home screen** so that **I can access it quickly like a native app**

**Scenario:**
```
Scenario 1: User can install the meet app as a shortcut on their device home screen
Given: I am using the application in my mobile browser
When: The browser offers "Add to Home Screen" option and I accept it
Then: The app installs as an icon on my home screen
```

### Feature 6: Display Charts Visualizing Event Details
**User Story:**
- As a **user**, I want to **view charts of event data** so that **I can visually understand the distribution of events by city**

**Scenario:**
```
Scenario 1: Show a chart with the number of upcoming events in each city
Given: There are events loaded from different cities
When: I navigate to the data visualization section
Then: I see a scatterplot chart showing how many events are in each city
```

## Technical Stack
- **Frontend:** React with Vite
- **Authentication:** Google Calendar API with OAuth2
- **Backend:** AWS Lambda (Serverless functions)
- **Hosting:** Vercel
- **Testing:** Test-Driven Development (TDD)
- **PWA:** Service Workers for offline functionality

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Git

### Installation
1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/meet-app.git
cd meet-app
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## Available Scripts
- `npm run dev` - Starts the development server
- `npm run build` - Builds the app for production
- `npm run preview` - Preview the production build locally
- `npm test` - Run tests

## Deployment
This app is deployed on Vercel. Any push to the main branch automatically triggers a new deployment.

## License
This project is part of the CareerFoundry Web Development Program.