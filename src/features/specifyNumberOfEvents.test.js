// src/features/specifyNumberOfEvents.test.js

import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { act } from 'react';
import userEvent from '@testing-library/user-event';
import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App';

const feature = loadFeature('src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
  let AppComponent;

  test("When user hasn't specified a number, 32 events are shown by default", ({ given, when, then }) => {
    given('I open the application for the first time', () => {
      // No special setup needed here
    });

    when("I don't specify how many events I want to see", async () => {
      await act(async () => {
        AppComponent = render(<App />);
      });
    });

    then('32 events are displayed automatically', async () => {
      const eventList = await screen.findByRole('list', { name: /event list/i, hidden: true })
        .catch(() => screen.getByRole('list')); // fallback if no aria-label

      const eventItems = await within(eventList).findAllByRole('listitem');
      expect(eventItems.length).toBe(32);
    });
  });

  test('User can change the number of events displayed', ({ given, when, then }) => {
    given('I am viewing the events list', () => {
      AppComponent = render(<App />);
    });

    when('I change the number in the "Number of events" field', async () => {
      const user = userEvent.setup();
      const numberInput = screen.getByRole('spinbutton', { name: /number of events/i });
      await act(async () => {
        await user.clear(numberInput);
        await user.type(numberInput, '5');
      });
    });

    then('The list updates to show exactly that number of events', async () => {
      const eventList = await screen.findByRole('list', { name: /event list/i, hidden: true })
        .catch(() => screen.getByRole('list'));

      const eventItems = await within(eventList).findAllByRole('listitem');
      expect(eventItems.length).toBe(5);
    });
  });
});