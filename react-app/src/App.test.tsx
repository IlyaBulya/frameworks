import { expect, describe, test, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Mock fetch API
window.fetch = vi.fn();

function createFetchResponse(data: any) {
  return {
    json: () => new Promise((resolve) => resolve(data)),
    ok: true,
  };
}

describe('React Todo App', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    // Mock the fetch call
    (fetch as any).mockResolvedValue(
      createFetchResponse([
        { id: 1, title: 'Test Todo 1', completed: false },
        { id: 2, title: 'Test Todo 2', completed: true },
      ])
    );
  });

  test('renders title', () => {
    render(<App />);
    expect(screen.getByText('React Todo Application')).toBeInTheDocument();
  });

  test('renders input and button', () => {
    render(<App />);
    expect(screen.getByTestId('new-todo-input')).toBeInTheDocument();
    expect(screen.getByTestId('add-todo-button')).toBeInTheDocument();
  });

  test('adds a todo to the list', async () => {
    render(<App />);

    // Wait for initial todos to load
    await waitFor(() => {
      expect(screen.getAllByTestId('todo-item').length).toBe(2);
    });

    const input = screen.getByTestId('new-todo-input');
    const button = screen.getByTestId('add-todo-button');

    fireEvent.change(input, { target: { value: 'Learn Vitest' } });
    fireEvent.click(button);

    // Check that the new todo was added
    const todoItems = screen.getAllByTestId('todo-item');
    expect(todoItems.length).toBe(3); // 2 from mock + 1 new
    expect(todoItems[2].textContent).toContain('Learn Vitest');
  });

  test('input clears after adding a todo', async () => {
    render(<App />);
    const input = screen.getByTestId('new-todo-input');
    const button = screen.getByTestId('add-todo-button');

    fireEvent.change(input, { target: { value: 'Learn React' } });
    fireEvent.click(button);

    expect(input).toHaveValue(''); // Ensure input is cleared
  });

  test('toggles todo completion status', async () => {
    render(<App />);

    // Wait for the todos to be loaded
    await waitFor(() => {
      expect(screen.getAllByTestId('todo-item').length).toBe(2);
    });

    const firstTodoCheckbox = screen.getAllByTestId('todo-checkbox')[0];
    fireEvent.click(firstTodoCheckbox);

    await waitFor(() => {
      const todoItems = screen.getAllByTestId('todo-item');
      expect(todoItems[0].classList.contains('completed')).toBe(true);
    });
  });

  test('removes a todo', async () => {
    render(<App />);

    // Wait for the todos to be loaded
    await waitFor(() => {
      expect(screen.getAllByTestId('todo-item').length).toBe(2);
    });

    const deleteButtons = screen.getAllByTestId('delete-todo-button');
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(screen.getAllByTestId('todo-item').length).toBe(1);
    });
  });

  test('fetches todos on mount', async () => {
    render(<App />);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/todos?_limit=5'
    );

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });

  test('refreshes todos when refresh button is clicked', async () => {
    render(<App />);

    // Wait for initial fetch
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    // Click refresh button
    const refreshButton = screen.getByTestId('fetch-todos-button');
    fireEvent.click(refreshButton);

    // Check that fetch was called again
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  test('shows loading state', async () => {
    // Make fetch hang to test loading state
    (fetch as any).mockImplementationOnce(() => new Promise(() => {}));

    render(<App />);

    // Loading indicator should be visible
    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();
  });

  test('shows error message when fetch fails', async () => {
    // Mock fetch to reject
    (fetch as any).mockRejectedValueOnce(new Error('API Error'));

    render(<App />);

    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeInTheDocument();
      expect(screen.getByTestId('error-message').textContent).toContain(
        'API Error'
      );
    });
  });
});
