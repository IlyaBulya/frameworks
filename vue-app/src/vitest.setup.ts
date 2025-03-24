import { expect, vi } from "vitest";
import "@testing-library/jest-dom";

// Declare global fetch
declare global {
  var fetch: any;
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
