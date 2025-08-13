//src/setupTests.js

import '@testing-library/jest-dom';

jest.setTimeout(30000); // 30 seconds

const suppressedWarnings = [
  'An update to App inside a test was not wrapped in act(...)',
  'The current testing environment is not configured to support act(...)',
];

const originalError = console.error;
console.error = (...args) => {
  if (typeof args[0] === 'string' && suppressedWarnings.some(w => args[0].includes(w))) {
    return;
  }
  originalError(...args);
};

// Only run ResizeObserver mocks in jsdom (where window exists)
if (typeof window !== 'undefined') {
const { ResizeObserver } = window;

beforeEach(() => {
  // Provide a mock if missing or if you prefer to always mock
window.ResizeObserver = jest.fn().mockImplementation(() => ({
observe: jest.fn(),
unobserve: jest.fn(),
disconnect: jest.fn(),
}));
});

afterEach(() => {
window.ResizeObserver = ResizeObserver;
jest.restoreAllMocks();
});
}