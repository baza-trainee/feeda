import { configureStore } from '@reduxjs/toolkit';

import { authSliceReducer } from '~/src/redux/slices/auth/loginSlice';

import instructionsReducer from '../slices/instructions';
import participantsReducer from '../slices/participants';
import { reducer as projectsReducer } from '../slices/projects/projects';

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    participants: participantsReducer,
    auth: authSliceReducer,
    instructions: instructionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
