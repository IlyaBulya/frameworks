<template>
  <div style="padding: 20px">
    <h1>To-Do List (Vue)</h1>
    <input v-model="input" placeholder="Enter a task" />
    <button @click="addTask">Add Task</button>
    <ul>
      <li v-for="(task, index) in tasks" :key="index">{{ task }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";

const tasks = ref([]);
const input = ref("");

const addTask = () => {
  if (input.value.trim() === "") return;
  tasks.value.push(input.value);
  input.value = "";
};
</script>
