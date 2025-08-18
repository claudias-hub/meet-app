import React from 'react';
import { render, waitFor } from '@testing-library/react';
import EventGenresChart from '../components/EventGenresChart';

// Mock layout so ResponsiveContainer renders in jsdom
const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;
const originalRAF = window.requestAnimationFrame;

beforeAll(() => {
  Element.prototype.getBoundingClientRect = function () {
    return {
      x: 0, y: 0, top: 0, left: 0,
      width: 800, height: 500,
      right: 800, bottom: 500,
      toJSON: () => {},
    };
  };
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (cb) => setTimeout(cb, 0);
  }
});

afterAll(() => {
  Element.prototype.getBoundingClientRect = originalGetBoundingClientRect;
  window.requestAnimationFrame = originalRAF;
});

describe('EventGenresChart', () => {
  const events = [
    { summary: 'React for Beginners' },
    { summary: 'Advanced React and State' },
    { summary: 'Modern JavaScript Deep Dive' },
    { summary: 'Node.js APIs' },
    { summary: 'Angular Basics' },
    { summary: 'jQuery Legacy Tricks' },
    { summary: 'Random meetup without genre' },
  ];

  test('renders slices for present genres and legend items', async () => {
    const { container } = render(
      <div style={{ width: 800, height: 500 }}>
        <EventGenresChart events={events} />
      </div>
    );

    // Wait for recharts to render sectors
    await waitFor(() => {
      const sectors = container.querySelectorAll('.recharts-sector');
      expect(sectors.length).toBeGreaterThan(0);
    });

    // Legend labels should include these genres (case-sensitive match to our names)
    const legendTexts = Array.from(
      container.querySelectorAll('.recharts-legend-item-text')
    ).map((n) => n.textContent);

    expect(legendTexts).toEqual(
      expect.arrayContaining(['React', 'JavaScript', 'Node', 'jQuery', 'Angular'])
    );
  });
});