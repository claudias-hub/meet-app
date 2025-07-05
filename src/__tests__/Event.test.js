import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Event from '../components/Event';
import { getEvents } from '../api';
import mockData from '../mock-data';

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
    const { queryByText } = render(<Event event={event} />);
    expect(queryByText(event.start.dateTime)).toBeInTheDocument();
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
    console.log('event.description:', event.description);
    const { queryByRole, queryByText } = render(<Event event={event} />);
    const user = userEvent.setup();
    const showDetailsButton = queryByRole('button', { name: /show details/i });
    await user.click(showDetailsButton);
    expect(queryByText(/Have you wondered how you can ask Google/)).toBeInTheDocument();
    expect(queryByRole('button', { name: /hide details/i })).toBeInTheDocument();
  });

  test('hides event details when hide details button is clicked', async () => {
    const { queryByRole, queryByText } = render(<Event event={event} />);
    const user = userEvent.setup();
    const showDetailsButton = queryByRole('button', { name: /show details/i });
    await user.click(showDetailsButton);
    const hideDetailsButton = queryByRole('button', { name: /hide details/i });
    await user.click(hideDetailsButton);
    expect(queryByText(event.description)).not.toBeInTheDocument();
  });
});