import { configureStore } from '@reduxjs/toolkit';

import participantsReducer from '../slices/participants';
import projecsReducer from '../slices/projects';

export const store = configureStore({
  reducer: {
    projects: projecsReducer,
    participants: participantsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
