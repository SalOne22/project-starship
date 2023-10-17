import { createSlice } from '@reduxjs/toolkit';
import { findAll, findOne, create, edit, remove } from './reviewsOperations';

const initialState = {
  reviews: [],
  userReview: null,
  isLoading: false,
  error: null,
};

const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(findAll.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(findAll.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(findAll.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(findOne.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(findOne.fulfilled, (state, action) => {
        if (
          action.payload &&
          JSON.stringify(action.payload) !== JSON.stringify({})
        ) {
          state.userReview = action.payload;
        } else {
          state.userReview = null;
        }
        state.isLoading = false;
        state.error = null;
      })
      .addCase(findOne.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(create.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(create.fulfilled, (state, action) => {
        state.userReview = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(create.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(edit.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(edit.fulfilled, (state, action) => {
        state.userReview = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(edit.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(remove.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(remove.fulfilled, (state) => {
        state.userReview = [
          {
            rating: null,
            review: '',
          },
        ];
        state.isLoading = false;
        state.error = null;
      })
      .addCase(remove.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const reviewsReducer = reviewSlice.reducer;
