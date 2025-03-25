<template>
  <div class="todo-app">
    <h1>Vue Todo App</h1>
    
    <div class="add-todo">
      <input
        v-model="newTodo"
        placeholder="Add a new todo"
        data-testid="new-todo-input"
      />
      <button @click="addTodo" data-testid="add-todo-button">Add</button>
    </div>
    
    <button 
      class="fetch-button" 
      @click="fetchTodos" 
      data-testid="fetch-todos-button"
    >
      Refresh Todos
    </button>
    
    <div v-if="loading" class="loading" data-testid="loading-indicator">Loading...</div>
    
    <div v-if="error" class="error" data-testid="error-message">Error: {{ error }}</div>
    
    <div v-if="!loading && !error && todos.length === 0" class="empty-list">
      No todos found. Add some!
    </div>
    
    <ul class="todo-list" data-testid="todo-list">
      <li 
        v-for="todo in todos" 
        :key="todo.id" 
        :class="{ completed: todo.completed }"
        data-testid="todo-item"
      >
        <input 
          type="checkbox" 
          :checked="todo.completed" 
          @change="toggleTodo(todo.id)"
          data-testid="todo-checkbox"
        />
        <span>{{ todo.title }}</span>
        <button 
          class="delete-btn" 
          @click="deleteTodo(todo.id)"
          data-testid="delete-todo-button"
        >
          Delete
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const todos = ref<Todo[]>([]);
const newTodo = ref("");
const loading = ref(true);
const error = ref<string | null>(null);

const fetchTodos = async () => {
  try {
    loading.value = true;
    error.value = null;
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos?_limit=5"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch todos");
    }
    todos.value = await response.json();
  } catch (err) {
    error.value = err instanceof Error ? err.message : "Unknown error";
  } finally {
    loading.value = false;
  }
};

const addTodo = () => {
  if (!newTodo.value.trim()) return;

  const newTodoItem: Todo = {
    id: Date.now(),
    title: newTodo.value,
    completed: false,
  };

  todos.value.push(newTodoItem);
  newTodo.value = "";
};

const toggleTodo = (id: number) => {
  const todo = todos.value.find((todo) => todo.id === id);
  if (todo) {
    todo.completed = !todo.completed;
  }
};

const deleteTodo = (id: number) => {
  todos.value = todos.value.filter((todo) => todo.id !== id);
};

onMounted(fetchTodos);
</script>

<style scoped>
.todo-app {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  color: #333;
}

.add-todo {
  display: flex;
  margin-bottom: 20px;
}

input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
}

button {
  padding: 10px 15px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
}

.fetch-button {
  width: 100%;
  margin-bottom: 20px;
  border-radius: 4px;
  background-color: #2196f3;
}

.todo-list {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

li.completed span {
  text-decoration: line-through;
  color: #888;
}

.delete-btn {
  margin-left: auto;
  background-color: #f44336;
  border-radius: 4px;
}

.loading, .error, .empty-list {
  text-align: center;
  padding: 10px;
  margin-top: 20px;
}

.error {
  color: #f44336;
}
</style>