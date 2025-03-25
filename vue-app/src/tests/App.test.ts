import { fireEvent, render, screen, waitFor } from "@testing-library/vue";
import { beforeEach, describe, expect, test, vi } from "vitest";
import App from "../App.vue";

// Mock fetch API
globalThis.fetch = vi.fn();

function createFetchResponse(data: any) {
  return {
    json: () => new Promise((resolve) => resolve(data)),
    ok: true,
  };
}

describe("Vue Todo App", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    // Mock the fetch call
    (fetch as any).mockResolvedValue(
      createFetchResponse([
        { id: 1, title: "Test Todo 1", completed: false },
        { id: 2, title: "Test Todo 2", completed: true },
      ])
    );
  });

  test("renders title", () => {
    const { getByText } = render(App);
    expect(getByText("Vue Todo App")).toBeInTheDocument();
  });

  test("renders input and button", () => {
    const { getByTestId } = render(App);
    expect(getByTestId("new-todo-input")).toBeInTheDocument();
    expect(getByTestId("add-todo-button")).toBeInTheDocument();
  });

  test("adds a todo to the list", async () => {
    const { getByTestId, getAllByTestId } = render(App);

    // Wait for initial todos to load
    await waitFor(() => {
      expect(getAllByTestId("todo-item").length).toBe(2);
    });

    const input = getByTestId("new-todo-input");
    const button = getByTestId("add-todo-button");

    await fireEvent.update(input, "Learn Vitest");
    await fireEvent.click(button);

    // Check that the new todo was added
    const todoItems = getAllByTestId("todo-item");
    expect(todoItems.length).toBe(3); // 2 from mock + 1 new
    expect(todoItems[2].textContent).toContain("Learn Vitest");
  });

  test("input clears after adding a todo", async () => {
    const { getByTestId } = render(App);

    // Wait for initial todos to load
    await waitFor(() => {
      expect(getByTestId("todo-list")).toBeInTheDocument();
    });

    const input = getByTestId("new-todo-input");
    const button = getByTestId("add-todo-button");

    await fireEvent.update(input, "Learn Vue");
    await fireEvent.click(button);

    expect(input).toHaveValue(""); // Ensure input is cleared
  });

  test("toggles todo completion status", async () => {
    const { getAllByTestId } = render(App);

    // Wait for the todos to be loaded
    await waitFor(() => {
      expect(getAllByTestId("todo-item").length).toBe(2);
    });

    const firstTodoCheckbox = getAllByTestId("todo-checkbox")[0];
    await fireEvent.click(firstTodoCheckbox);

    const todoItems = getAllByTestId("todo-item");
    expect(todoItems[0].classList.contains("completed")).toBe(true);
  });

  test("removes a todo", async () => {
    const { getAllByTestId } = render(App);

    // Wait for the todos to be loaded
    await waitFor(() => {
      expect(getAllByTestId("todo-item").length).toBe(2);
    });

    const deleteButtons = getAllByTestId("delete-todo-button");
    await fireEvent.click(deleteButtons[0]);

    expect(getAllByTestId("todo-item").length).toBe(1);
  });

  test("fetches todos on mount", async () => {
    render(App);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/todos?_limit=5"
    );
  });

  test("refreshes todos when refresh button is clicked", async () => {
    const { getByTestId } = render(App);

    // Wait for initial fetch
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    // Click refresh button
    const refreshButton = getByTestId("fetch-todos-button");
    await fireEvent.click(refreshButton);

    // Check that fetch was called again
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  test("shows loading state", async () => {
    // Make fetch hang to test loading state
    (fetch as any).mockImplementationOnce(() => new Promise(() => {}));

    const { getByTestId } = render(App);

    // Loading indicator should be visible
    expect(getByTestId("loading-indicator")).toBeInTheDocument();
  });

  test("shows error message when fetch fails", async () => {
    // Mock fetch to reject
    (fetch as any).mockRejectedValueOnce(new Error("API Error"));

    const { getByTestId } = render(App);

    await waitFor(() => {
      expect(getByTestId("error-message")).toBeInTheDocument();
      expect(getByTestId("error-message").textContent).toContain("API Error");
    });
  });
});
