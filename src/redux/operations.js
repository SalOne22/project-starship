import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import handleError from '@/modules/Register/components/HandleError';
import { selectToken } from './slices/authSlice';

export const $instance = axios.create({
  baseURL: 'https://gt-project.onrender.com/api',
});
export const setToken = (token) => {
  if (token) {
    return ($instance.defaults.headers.authorization = `Bearer ${token}`);
  }
  $instance.defaults.headers.authorization = '';
};

$instance.interceptors.response.use(
  async (response) => response,
  async (error) => {
    if (
      error.response.status === 401 &&
      error.response.data.message !== 'Password invalid' &&
      error.response.data.message !== 'Email or password invalid' &&
      error.response.data.message !== 'Secret key is invalid' &&
      !error.config._retry
    ) {
      error.config._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');
      try {
        const { data } = await $instance.post('/auth/refresh', {
          refreshToken,
        });
        setToken(data.token);
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('token', data.token);
        return $instance(error.config);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);

export const registerUserThunk = createAsyncThunk(
  'auth/register',
  async (user, thunkApi) => {
    try {
      const { data } = await $instance.post('/auth/signup', user);
      setToken(data.token);
      localStorage.setItem('refreshToken', data.refreshToken);
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
      localStorage.setItem('refreshToken', data.refreshToken);
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
      setToken();
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  },
);

export const refreshUserThunk = createAsyncThunk(
  'auth/refresh',
  async (_, thunkApi) => {
    try {
      const { data } = await $instance.get('/users/current');
      const token = localStorage.getItem('token');
      return { token, user: data };
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  },
);

export const updateUserThunk = createAsyncThunk(
  'auth/updateUserThunk',
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

export const updatePassword = createAsyncThunk(
  'auth/updatePassword',
  async (formData, thunkApi) => {
    const token = selectToken(thunkApi.getState());

    try {
      const response = await $instance.patch('/users/edit/password', formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  },
);

export const deleteUserThunk = createAsyncThunk(
  'auth/delete',
  async (secretKey, thunkApi) => {
    try {
      const { data } = await $instance.delete('/users/delete', {
        data: secretKey,
      });

      return data;
    } catch (error) {
      const errorMessage = error.response.data.message;
      handleError(errorMessage);
      return thunkApi.rejectWithValue(errorMessage);
    }
  },
);

export const getRemoveKey = createAsyncThunk(
  'auth/getRemoveKey',
  async (_, thunkApi) => {
    try {
      await $instance.get('/auth/removekey');
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  },
);
