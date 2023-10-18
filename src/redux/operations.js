import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import handleError from '@/modules/Register/components/HandleError';
import { selectToken } from './slices/authSlice';

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
      const { data } = await $instance.post('/auth/signup', user);
      setToken(data.token);
      return data;
    } catch (error) {
      const errorMessage = error.response.data.message;
      handleError(errorMessage);
      return thunkApi.rejectWithValue(errorMessage);
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
      const errorMessage = error.response.data.message;
      handleError(errorMessage);
      return thunkApi.rejectWithValue(errorMessage);
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
      return thunkApi.rejectWithValue(error.response.data.message);
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
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  },
);

export const updateUserData = createAsyncThunk(
  'auth/updateUserData',
  async (formData, thunkApi) => {
    const token = selectToken(thunkApi.getState());

    try {
      const response = await $instance.patch('/users/edit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  },
);

export const resetUserThunk = createAsyncThunk(
  'auth/reset',
  async (email, thunkApi) => {
    console.log('email', email);

    try {
      const { data } = await $instance.post('/auth/reset', email);
      return data;
    } catch (error) {
      const errorMessage = error.response.data.message;
      handleError(errorMessage);
      return thunkApi.rejectWithValue(errorMessage);
    }
  },
);
