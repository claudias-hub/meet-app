// src/setupTests.js

import '@testing-library/jest-dom';

jest.setTimeout(30000); // 30 seconds

const suppressedWarnings = [
  'An update to App inside a test was not wrapped in act(...)',
  'The current testing environment is not configured to support act(...)',
];

const originalError = console.error;
console.error = (...args) => {
  if (suppressedWarnings.some(warning => args[0].includes(warning))) {
    return;
  }
  originalError(...args);
};