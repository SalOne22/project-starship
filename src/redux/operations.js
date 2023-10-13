import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const $instance = axios.create({
  baseURL: 'https://gt-project.onrender.com/api',
});
export const setToken = (token) => {
  $instance.defaults.headers['Authorization'] = `Bearer ${token}`;
};
export const clearToken = () => {
  $instance.defaults.headers['Authorization'] = '';
};

export const registerUserThunk = createAsyncThunk(
  'auth/register',
  async (user, thunkApi) => {
    try {
      const { data } = await $instance.post('/users/signup', user);
      setToken(data.token);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const loginUserThunk = createAsyncThunk(
  'auth/login',
  async (user, thunkApi) => {
    try {
      const { data } = await $instance.post('/users/login', user);
      setToken(data.token);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const refreshUserThunk = createAsyncThunk(
  'auth/refresh',
  async (_, thunkApi) => {
    const state = thunkApi.getState();
    const token = state.auth.token;

    try {
      setToken(token);
      const { data } = await $instance.get('/users/current', token); //
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);
