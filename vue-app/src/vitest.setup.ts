import { expect, vi } from 'vitest';
import '@testing-library/jest-dom';

// Declare global fetch if not already declared
if (typeof globalThis.fetch === 'undefined') {
  globalThis.fetch = vi.fn();
}

// Add jest-dom matchers
expect.extend({
  toBeInTheDocument(received) {
    const pass = Boolean(received);
    return {
      pass,
      message: () => `expected ${received} to be in the document`,
    };
  },
  toHaveValue(received, expected) {
    const pass = received.value === expected;
    return {
      pass,
      message: () => `expected ${received} to have value ${expected}`,
    };
  },
});
