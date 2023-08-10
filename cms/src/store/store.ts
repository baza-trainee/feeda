import { configureStore } from '@reduxjs/toolkit';
import projecsReducer from '../slices/projects';

export const store = configureStore({
  reducer: {
    projects: projecsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
