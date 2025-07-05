import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  test('renders input spinbutton', () => {
    const { getByRole } = render(<NumberOfEvents />);
    expect(getByRole('spinbutton')).toBeInTheDocument();
  });

  test('default value is 32', () => {
    const { getByRole } = render(<NumberOfEvents />);
    expect(getByRole('spinbutton')).toHaveValue(32);
  });

  test('value changes when user types', async () => {
    const { getByRole } = render(<NumberOfEvents />);
    const input = getByRole('spinbutton');
    const user = userEvent.setup();
    await user.clear(input);
    await user.type(input, '10');
    expect(input).toHaveValue(10);
  });
});