import { createAsyncThunk } from '@reduxjs/toolkit';
import { $instance } from '@/redux/operations';

export const findAll = createAsyncThunk(
  'reviews/findAll',
  async (_, thunkAPI) => {
    try {
      const { data } = await $instance.get(`/reviews`);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const findOne = createAsyncThunk(
  'reviews/findOne',
  async (_, thunkAPI) => {
    try {
      const { data } = await $instance.get(`/reviews/own`);
      return data;
    } catch (e) {
      thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const create = createAsyncThunk(
  'reviews/create',
  async (review, thunkAPI) => {
    try {
      const { data } = await $instance.post('/reviews/own', review);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const edit = createAsyncThunk(
  'reviews/edit',
  async (review, thunkAPI) => {
    try {
      const { data } = await $instance.patch(`/reviews/own`, review);
      return data;
    } catch (e) {
      thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const remove = createAsyncThunk(
  'reviews/remove',
  async (_, thunkAPI) => {
    try {
      const { data } = await $instance.delete(`/reviews/own`);
      return data;
    } catch (e) {
      thunkAPI.rejectWithValue(e.message);
    }
  },
);
