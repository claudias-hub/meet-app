// src/__test__/App.test.js

import React from 'react';
import { render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { getEvents } from '../api';
import { act } from 'react';

jest.mock('../api');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('<App /> component', () => {
  let AppDOM;
  beforeEach(() => {
    AppDOM = render(<App />).container.firstChild;
  });

  test('renders list of events', () => {
    expect(AppDOM.querySelector('#event-list')).toBeInTheDocument();
  });

  test('render CitySearch', () => {
    expect(AppDOM.querySelector('#city-search')).toBeInTheDocument();
  });
});

describe('<App /> integration', () => {
  test('renders a list of events matching the city selected by the user', async () => {
    const user = userEvent.setup();
    let AppComponent;
    await act(async () => {
      AppComponent = render(<App />);
    });
    const AppDOM = AppComponent.container.firstChild;


    const CitySearchDOM = AppDOM.querySelector('#city-search');
    const CitySearchInput = within(CitySearchDOM).queryByRole('textbox');


    await act(async () => {
      await user.type(CitySearchInput, "Berlin");
    });

    const berlinSuggestionItem = within(CitySearchDOM).queryByText('Berlin, Germany');

    await act(async () => {
      await user.click(berlinSuggestionItem);
    });


    const EventListDOM = AppDOM.querySelector('#event-list');
    const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');  


    const allEvents = await getEvents();
    const berlinEvents = allEvents.filter(
      event => event.location === 'Berlin, Germany'
    );


    expect(allRenderedEventItems.length).toBe(berlinEvents.length);
    allRenderedEventItems.forEach(event => {
      expect(event.textContent).toContain("Berlin, Germany");
    });
  });
  
  test('renders correct number of events when user changes the number in NumberOfEvents', async () => {
    const user = userEvent.setup();
    let AppComponent;
    await act(async () => {
      AppComponent = render(<App />);
    });
    const AppDOM = AppComponent.container.firstChild;

    // Find the NumberOfEvents input
    const NumberOfEventsDOM = AppDOM.querySelector('#number-of-events');
    const NumberOfEventsInput = within(NumberOfEventsDOM).queryByRole('spinbutton');

    // Clear the default value (32) and type 10
    await act(async () => {
      await user.type(NumberOfEventsInput, "{backspace}{backspace}10");
    });

    // Find the EventList and check the number of rendered events
    const EventListDOM = AppDOM.querySelector('#event-list');
    const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');

    // Verify that exactly 10 events are displayed
    expect(allRenderedEventItems.length).toBe(10);
  });
});