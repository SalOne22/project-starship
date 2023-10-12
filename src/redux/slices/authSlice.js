import { createSlice } from '@reduxjs/toolkit';

const isRejectedAction = (action) =>
  action.type.endsWith('rejected') && action.type.includes('user');
const isPendingAction = (action) =>
  action.type.endsWith('pending') && action.type.includes('user');
const isFulfilledAction = (action) =>
  action.type.endsWith('fulfilled') && action.type.includes('user');

const initialState = {
  user: null,
  token: null,
  error: null,
  isAuthenticated: false,
  isLoading: false,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) =>
    builder
      .addMatcher(isPendingAction, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(isRejectedAction, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addMatcher(isFulfilledAction, (state) => {
        state.isLoading = false;
      }),
});

export const { clearError } = slice.actions;
export const authReducer = slice.reducer;
