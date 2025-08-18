import React from 'react';
import { render, waitFor } from '@testing-library/react';
import CityEventsChart from '../components/CityEventsChart';

// Make ResponsiveContainer think it has space in jsdom
const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;
const originalRAF = window.requestAnimationFrame;

beforeAll(() => {
  // Return non-zero size for any element (good enough for these tests)
  Element.prototype.getBoundingClientRect = function () {
    return {
      x: 0, y: 0, top: 0, left: 0,
      width: 800, height: 500,    // non-zero so Recharts renders
      right: 800, bottom: 500,
      toJSON: () => {},
    };
  };

  // Polyfill requestAnimationFrame if missing
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (cb) => setTimeout(cb, 0);
  }
});

afterAll(() => {
  Element.prototype.getBoundingClientRect = originalGetBoundingClientRect;
  window.requestAnimationFrame = originalRAF;
});


describe('CityEventsChart', () => {
  const allLocations = [
    'Berlin, Germany',
    'London, UK',
    'Dubai - United Arab Emirates'
  ];

  const events = [
    { location: 'Berlin, Germany' },
    { location: 'Berlin, Germany' },
    { location: 'London, UK' },
    { location: 'Dubai - United Arab Emirates' },
    { location: 'Dubai - United Arab Emirates' },
    { location: 'Dubai - United Arab Emirates' },
  ];

  test('renders a dot per location and shows x-axis ticks (city labels)', async () => {
    const { container } = render(
      <div style={{ width: 800, height: 500 }}>
        <CityEventsChart allLocations={allLocations} events={events} />
      </div>
    );

// Wait for the useEffect to set data and for Recharts to render
    await waitFor(() => {
      const dots = container.querySelectorAll('.recharts-scatter-symbol');
      expect(dots.length).toBe(3);
    });

// Look for x-axis tick labels
// Tick text is inside tspan elements under .recharts-cartesian-axis-tick-value
    const tickTexts = Array.from(
      container.querySelectorAll('.recharts-cartesian-axis-tick-value tspan')
    ).map(n => n.textContent);

// We expect trimmed city names as labels
    expect(tickTexts).toEqual(
      expect.arrayContaining(['Berlin', 'London', 'Dubai'])
    );
  });
});