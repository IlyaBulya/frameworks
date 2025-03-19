import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

test("renders To-Do List title", () => {
  render(<App />);
  expect(screen.getByText("To-Do List (React)")).toBeInTheDocument();
});

test("renders input and button", () => {
  render(<App />);
  expect(screen.getByPlaceholderText("Enter a task")).toBeInTheDocument();
  expect(screen.getByText("Add Task")).toBeInTheDocument();
});
