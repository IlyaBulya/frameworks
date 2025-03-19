import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

describe("To-Do List (React)", () => {
  test("renders title", () => {
    render(<App />);
    expect(screen.getByText("To-Do List (React)")).toBeInTheDocument();
  });

  test("renders input and button", () => {
    render(<App />);
    expect(screen.getByPlaceholderText("Enter a task")).toBeInTheDocument();
    expect(screen.getByText("Add Task")).toBeInTheDocument();
  });

  test("adds a task to the list", () => {
    render(<App />);
    const input = screen.getByPlaceholderText("Enter a task");
    const button = screen.getByText("Add Task");

    fireEvent.change(input, { target: { value: "Learn Vitest" } });
    fireEvent.click(button);

    expect(screen.getByText("Learn Vitest")).toBeInTheDocument();
  });

  test("input clears after adding a task", () => {
    render(<App />);
    const input = screen.getByPlaceholderText("Enter a task");
    const button = screen.getByText("Add Task");

    fireEvent.change(input, { target: { value: "Learn React" } });
    fireEvent.click(button);

    expect(input).toHaveValue(""); // Проверяем, что инпут очистился
  });
});
