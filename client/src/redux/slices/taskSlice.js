// src/slices/taskSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  filter: "all",
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push({ ...action.payload, status: "pending" });
    },
    toggleTaskStatus: (state, action) => {
      const taskId = action.payload;
      const task = state.tasks.find((task) => task.id === taskId);
      if (task) {
        task.status = task.status === "pending" ? "completed" : "pending";
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    filterTasks: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { addTask, toggleTaskStatus, deleteTask, filterTasks } =
  taskSlice.actions;

export default taskSlice.reducer;
