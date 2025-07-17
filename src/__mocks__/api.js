// src/__mocks__/api.js

import mockData from '../mock-data';

export const getEvents = jest.fn(() => Promise.resolve(mockData));

export const extractLocations = jest.fn(events => [...new Set(events.map(e => e.location))]);
