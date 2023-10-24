import { createSlice } from '@reduxjs/toolkit';
import {
  registerUserThunk,
  loginUserThunk,
  refreshUserThunk,
  setToken,
  logoutUserThunk,
  updateUserThunk,
  resetUserThunk,
  updatePassword,
  deleteUserThunk,
  getRemoveKey,
} from '../operations';
// const isRejectedAction = (action) =>
//   action.type.endsWith('rejected') && action.type.includes('user');
// const isPendingAction = (action) =>
//   action.type.endsWith('pending') && action.type.includes('user');
// const isFulfilledAction = (action) =>
//   action.type.endsWith('fulfilled') && action.type.includes('user');

const initialState = {
  user: null,
  token: null,
  isGoogleAuth: false,
  error: null,
  isAuthenticated: false,
  isLoading: false,
};

// const slice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     clearError(state) {
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) =>
//     builder
//       .addMatcher(isPendingAction, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addMatcher(isRejectedAction, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       })
//       .addMatcher(isFulfilledAction, (state) => {
//         state.isLoading = false;
//       }),

// });

const slice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    updateToken(state, { payload }) {
      state.token = payload;
      setToken(payload);
    },
    clearError(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) =>
    builder
      //  ------- register---------
      .addCase(registerUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      //  -------  login---------
      .addCase(loginUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      //  -------logout---------
      .addCase(logoutUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('token');
      })
      .addCase(logoutUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('token');
        state.error = action.payload;
      })

      //  -------refresh---------
      .addCase(refreshUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(refreshUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isGoogleAuth = action.payload.user.isGoogleAuth;
      })
      .addCase(refreshUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      //---------------update user data-----------
      .addCase(updateUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      //---------------reset user password-----------
      .addCase(resetUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetUserThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = true;
      })
      .addCase(resetUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // -------------------Change password-----------
      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      //---------------delete user-----------
      .addCase(deleteUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteUserThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('token');
      })
      .addCase(deleteUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getRemoveKey.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRemoveKey.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(getRemoveKey.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }),
});

export const selectLoading = (state) => state.auth.isLoading;
export const selectError = (state) => state.auth.error;
export const selectToken = (state) => state.auth.token;
export const selectUserData = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export const { clearError, updateToken } = slice.actions;
export const authReducer = slice.reducer;
