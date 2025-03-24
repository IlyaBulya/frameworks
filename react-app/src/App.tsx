import { useState, useEffect } from "react";
import "./App.css";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");
      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }
      const data = await response.json();
      setTodos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = () => {
    if (!newTodo.trim()) return;
    
    const newTodoItem: Todo = {
      id: Date.now(),
      title: newTodo,
      completed: false,
    };
    
    setTodos([...todos, newTodoItem]);
    setNewTodo("");
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="todo-app">
      <h1>React Todo Application</h1>
      
      <div className="add-todo">
        <input
          data-testid="new-todo-input"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
        />
        <button data-testid="add-todo-button" onClick={addTodo}>
          Add
        </button>
      </div>
      
      <button 
        className="fetch-button" 
        data-testid="fetch-todos-button" 
        onClick={fetchTodos}
      >
        Refresh Todos
      </button>
      
      {loading && <div data-testid="loading-indicator" className="loading">Loading...</div>}
      
      {error && <div data-testid="error-message" className="error">Error: {error}</div>}
      
      {!loading && !error && todos.length === 0 && (
        <div className="empty-list">No todos found. Add some!</div>
      )}
      
      <ul className="todo-list" data-testid="todo-list">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={todo.completed ? "completed" : ""}
            data-testid="todo-item"
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              data-testid="todo-checkbox"
            />
            <span>{todo.title}</span>
            <button
              className="delete-btn"
              onClick={() => deleteTodo(todo.id)}
              data-testid="delete-todo-button"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;