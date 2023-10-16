import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistReducer,
} from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './slices/authSlice';
import { tasksReducer } from '@/modules/Calendar/redux/tasksSlice';
import { reviewsReducer } from '@/modules/Reviews/redux/reviewsSlice';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    tasks: tasksReducer,
    reviews: reviewsReducer,
  },
  middleware: (getDM) =>
    getDM({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
