import { configureStore } from '@reduxjs/toolkit';

import participantsReducer from '../slices/participants';
import { reducer as projectsReducer } from '../slices/projects/projects';

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    participants: participantsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;