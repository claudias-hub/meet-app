jest.mock('../api', () => ({
  getEvents: jest.fn(() => Promise.resolve([
    {
      id: 1,
      summary: "Event 1",
      start: { dateTime: "2023-01-01T10:00:00Z" },
      location: "Online"
    },
    {
      id: 2,
      summary: "Event 2",
      start: { dateTime: "2023-01-02T11:00:00Z" },
      location: "New York"
    }
    // ...add as many as you want, e.g., 32 for the default
  ])),
  extractLocations: jest.fn((events) => [...new Set(events.map(e => e.location))])
}));

import React from 'react';
import { render, within, waitFor, act } from '@testing-library/react';
import EventList from '../components/EventList';
import { getEvents } from '../api';
import App from '../App';



describe('<EventList /> component', () => {
  let EventListComponent;
  beforeEach(() => {
    EventListComponent = render(<EventList />);
  });

  test('has an element with "list" role', () => {
    expect(EventListComponent.queryByRole("list")).toBeInTheDocument();
  });

  test('renders correct number of events', async () => {
    const allEvents = await getEvents(); 
    EventListComponent.rerender(<EventList events={allEvents} />);
    expect(EventListComponent.getAllByRole("listitem")).toHaveLength(allEvents.length);
  });
});

describe('<EventList /> integration', () => {
  test('renders a list of 32 events when the app is mounted and rendered', async () => {
    let AppComponent;
    await act(async () => {
      AppComponent = render(<App />);
    });
    const AppDOM = AppComponent.container.firstChild;
    const EventListDOM = AppDOM.querySelector('#event-list');
    await waitFor(() => {
      const EventListItems = within(EventListDOM).queryAllByRole('listitem');
      expect(EventListItems.length).toBeGreaterThan(0);
    });
  });

});