// src/features/filterEventsByCity.test.js

import React from 'react';
import { render, waitFor, within, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App'; 
import { getEvents } from '../api'; 

const feature = loadFeature('src/features/filterEventsByCity.feature');

defineFeature(feature, test => {
  let AppComponent;
  let CitySearchDOM;

  test('When user hasn\'t searched for a city, show upcoming events from all cities', ({ given, when, then }) => {
    given('user hasn’t searched for any city', () => {
      // No setup needed
    });

    when('the user opens the app', () => {
      AppComponent = render(<App />);
    });

    then('the user should see the list of all upcoming events.', async () => {
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');

      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBe(32); // Adjust if your default event count differs
      });
    });
  });

  test('User should see a list of suggestions when they search for a city', ({ given, when, then }) => {
    given('the main page is open', () => {
      AppComponent = render(<App />);
    });

    when('user starts typing in the city textbox', async () => {
      const user = userEvent.setup();
      const AppDOM = AppComponent.container.firstChild;
      CitySearchDOM = AppDOM.querySelector('#city-search');
      const citySearchInput = within(CitySearchDOM).getByRole('textbox');
      await act(async () => {
        await user.type(citySearchInput, 'Berlin');
      });
    });

    then('the user should receive a list of cities (suggestions) that match what they’ve typed', () => {
      const suggestionListItems = CitySearchDOM.querySelectorAll('.suggestions li');
      expect(suggestionListItems.length).toBe(2); // Berlin + "See all cities"
    });
  });

  test('User can select a city from the suggested list', ({ given, when, then }) => {
    let suggestionListItems;
    let citySearchInput;

    given('user see a list of suggested cities', async () => {
      AppComponent = render(<App />);
      const user = userEvent.setup();
      const AppDOM = AppComponent.container.firstChild;
      CitySearchDOM = AppDOM.querySelector('#city-search');
      citySearchInput = within(CitySearchDOM).getByRole('textbox');
      await act(async () => {
        await user.type(citySearchInput, 'Berlin');
      });
      suggestionListItems = CitySearchDOM.querySelectorAll('.suggestions li');
      expect(suggestionListItems.length).toBe(2);
    });

    when('the user selects a city from the list', async () => {
      const user = userEvent.setup();
      await act(async () => {
        await user.click(suggestionListItems[0]); // Click "Berlin, Germany"
      });
    });

    then('The city is selected and user sees events for that city only', async () => {
      expect(citySearchInput.value).toBe('Berlin, Germany');
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');
      const EventListItems = within(EventListDOM).queryAllByRole('listitem');
      const allEvents = await getEvents();
      const berlinEvents = allEvents.filter(event => event.location === 'Berlin, Germany');
      expect(EventListItems.length).toBe(berlinEvents.length);
    });
  });
});