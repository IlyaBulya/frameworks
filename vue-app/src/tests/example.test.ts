import { render, screen, fireEvent } from "@testing-library/vue";
import "@testing-library/jest-dom";
import App from "../App.vue";

describe("To-Do List (Vue)", () => {
  test("renders title", () => {
    render(App);
    expect(screen.getByText("To-Do List (Vue)")).toBeInTheDocument();
  });

  test("renders input and button", () => {
    render(App);
    expect(screen.getByPlaceholderText("Enter a task")).toBeInTheDocument();
    expect(screen.getByText("Add Task")).toBeInTheDocument();
  });

  test("adds a task to the list", async () => {
    render(App);
    const input = screen.getByPlaceholderText("Enter a task");
    const button = screen.getByText("Add Task");

    await fireEvent.update(input, "Learn Vitest");
    await fireEvent.click(button);

    expect(screen.getByText("Learn Vitest")).toBeInTheDocument();
  });

  test("input clears after adding a task", async () => {
    render(App);
    const input = screen.getByPlaceholderText("Enter a task");
    const button = screen.getByText("Add Task");

    await fireEvent.update(input, "Learn Vue");
    await fireEvent.click(button);

    expect(input).toHaveValue(""); // Проверяем, что инпут очистился
  });
});
