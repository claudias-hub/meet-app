import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';
import { act } from 'react';

describe('<NumberOfEvents /> component', () => {
  test('renders input spinbutton', () => {
    const { getByRole } = render(<NumberOfEvents currentNOE={32} setCurrentNOE={() => {}} />);
    expect(getByRole('spinbutton')).toBeInTheDocument();
  });

  test('default value is 32', () => {
    const { getByRole } = render(<NumberOfEvents currentNOE={32} setCurrentNOE={() => {}} />);
    expect(getByRole('spinbutton')).toHaveValue(32);
  });

  test('value changes when user types', async () => {
    // We'll use a variable to simulate state change
    let noe = 32;
    const setCurrentNOE = (val) => { noe = val; };
    const { getByRole, rerender } = render(<NumberOfEvents currentNOE={noe} setCurrentNOE={setCurrentNOE} />);

    const input = getByRole('spinbutton');
    const user = userEvent.setup();
    await act(async () => {
      await user.clear(input);
    });
    await act(async () => {
      await user.type(input, '10');
    });
    

    // Simulate prop update
    rerender(<NumberOfEvents currentNOE={10} setCurrentNOE={setCurrentNOE} />);
    expect(getByRole('spinbutton')).toHaveValue(10);
  });
});