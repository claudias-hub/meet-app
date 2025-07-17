// src/features/showHideAnEventsDetails.test.js

import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import { act } from 'react';
import userEvent from '@testing-library/user-event';
import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App';

const feature = loadFeature('src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
  let AppComponent;

  test('An event element is collapsed by default', ({ given, when, then }) => {
    given('user is viewing the events list', () => {
      // No special setup needed here
    });

    when('The page loads', async () => {
      await act(async () => {
        AppComponent = render(<App />);
      });
    });

    then('All events are displayed in collapsed state (no details visible)', async () => {
      const eventList = await screen.findByRole('list', { name: /event list/i, hidden: true }) // fallback if you have aria-label
        .catch(() => screen.getByRole('list')); // fallback to any list if no aria-label

      const eventItems = within(eventList).getAllByRole('listitem');
      expect(eventItems.length).toBeGreaterThan(0);

      eventItems.forEach(eventItem => {
        // Check that details div is NOT present inside each event
        const details = within(eventItem).queryByText(/description:/i);
        expect(details).not.toBeInTheDocument();
      });
    });
  });

  test('User can expand an event to see details', ({ given, when, then }) => {
    let firstEvent;

    given('user is viewing a collapsed event', async () => {
      AppComponent = render(<App />);
      const eventList = await screen.findByRole('list');
      const eventItems = within(eventList).getAllByRole('listitem');
      firstEvent = eventItems[0];
    });

    when('user clicks on the "Details" button', async () => {
      const user = userEvent.setup();
      const detailsButton = within(firstEvent).getByRole('button', { name: /show details/i });
      await act(async () => {
        await user.click(detailsButton);
      });
    });

    then('The event expands and shows detailed information', () => {
      const details = within(firstEvent).getByText(/description:/i);
      expect(details).toBeInTheDocument();
    });
  });

  test('User can collapse an event to hide details', ({ given, when, then }) => {
    let firstEvent;

    given('user is viewing an expanded event with details', async () => {
      AppComponent = render(<App />);
      const eventList = await screen.findByRole('list');
      const eventItems = within(eventList).getAllByRole('listitem');
      firstEvent = eventItems[0];

      const user = userEvent.setup();
      const detailsButton = within(firstEvent).getByRole('button', { name: /show details/i });
      await user.click(detailsButton);

      // Confirm details are visible
      const details = within(firstEvent).getByText(/description:/i);
      expect(details).toBeInTheDocument();
    });

    when('user clicks the collapse button', async () => {
      const user = userEvent.setup();
      const hideButton = within(firstEvent).getByRole('button', { name: /hide details/i });
      await user.click(hideButton);
    });

    then('The details are hidden and the event returns to collapsed state', () => {
      const details = within(firstEvent).queryByText(/description:/i);
      expect(details).not.toBeInTheDocument();
    });
  });
});