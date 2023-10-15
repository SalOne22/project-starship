import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const $instance = axios.create({
  baseURL: 'https://gt-project.onrender.com/api',
  // baseURL: 'http:localhost:3333/api',
  // baseURL: 'https://connections-api.herokuapp.com/'
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
      const { data } = await $instance.post('/auth/signup', user);
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
      const { data } = await $instance.post('/auth/login', user);
      setToken(data.token);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const logoutUserThunk = createAsyncThunk(
  'auth/logout',
  async (user, thunkApi) => {
    try {
      await $instance.post('/auth/logout', user);
      clearToken();
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
