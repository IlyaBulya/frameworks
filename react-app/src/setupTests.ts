import { expect, vi } from "vitest";
import "@testing-library/jest-dom";

// Remove duplicate global fetch declaration

// Add jest-dom matchers
expect.extend({
  toBeInTheDocument(received) {
    const pass = Boolean(received);
    return {
      pass,
      message: () => `expected ${received} to be in the document`,
    };
  },
});
