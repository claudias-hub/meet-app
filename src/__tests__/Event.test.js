// src/__test__/Event.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Event from '../components/Event';
import mockData from '../mock-data';
import { act } from 'react';

jest.mock('../api');

beforeEach(() => {
  jest.clearAllMocks();
});


describe('<Event /> component', () => {
  let event;

  beforeAll(() => {
    event = mockData[0];
  });

  test('renders event title', () => {
    const { queryByText } = render(<Event event={event} />);
    expect(queryByText(event.summary)).toBeInTheDocument();
  });

  test('renders event start time', () => {
    const { container, queryByText } = render(<Event event={event} />);

    const startDate = new Date(event.start.dateTime);
    const formattedDate = startDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    const formattedTime = startDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    expect(screen.getAllByText(new RegExp(formattedDate))[0]).toBeInTheDocument();
    expect(screen.getAllByText(new RegExp(formattedTime))[0]).toBeInTheDocument();
  });

  test('renders event location', () => {
    const { queryByText } = render(<Event event={event} />);
    expect(queryByText(event.location)).toBeInTheDocument();
  });

  test('renders show details button', () => {
    const { queryByRole } = render(<Event event={event} />);
    expect(queryByRole('button', { name: /show details/i })).toBeInTheDocument();
  });

  test('shows event details when show details button is clicked', async () => {
    
    const { queryByRole, queryByText } = render(<Event event={event} />);
    const user = userEvent.setup();
    const showDetailsButton = queryByRole('button', { name: /show details/i });
    await act(async () => {
      await user.click(showDetailsButton);
    });
    expect(queryByText(/Have you wondered how you can ask Google/)).toBeInTheDocument();
    expect(queryByRole('button', { name: /hide details/i })).toBeInTheDocument();
  });

  test('hides event details when hide details button is clicked', async () => {
    const { queryByRole, queryByText } = render(<Event event={event} />);
    const user = userEvent.setup();
    const showDetailsButton = queryByRole('button', { name: /show details/i });
    await act(async () => {
      await user.click(showDetailsButton);
    });
    const hideDetailsButton = queryByRole('button', { name: /hide details/i });
    await act(async () => {
      await user.click(hideDetailsButton);
    });
    expect(queryByText(event.description)).not.toBeInTheDocument();
  });

  test('shows fallback text when event description is missing', async () => {
    const eventWithoutDescription = { ...event, description: undefined };
    const { queryByRole, queryByText } = render(<Event event={eventWithoutDescription} />);
    const user = userEvent.setup();
    const showDetailsButton = queryByRole('button', { name: /show details/i });
    await act(async () => {
      await user.click(showDetailsButton);
    });
    expect(queryByText(/No description available/i)).toBeInTheDocument();
  });
});