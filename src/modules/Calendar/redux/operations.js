import { $instance } from '@/redux/operations';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (date, { rejectWithValue }) => {
    try {
      const { data } = await $instance.get('/tasks', { params: { date } });

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const addTask = createAsyncThunk(
  'tasks/addTask',
  async (task, { rejectWithValue }) => {
    try {
      const { data } = await $instance.post('/tasks', task);

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId, { rejectWithValue }) => {
    try {
      const { data } = await $instance.delete(`/tasks/${taskId}`);

      return { ...data, _id: taskId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const editTask = createAsyncThunk(
  'tasks/editTask',
  async (
    { _id, title, start, end, priority, date, category },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await $instance.patch(`/tasks/${_id}`, {
        title,
        start,
        end,
        priority,
        date,
        category,
      });

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
