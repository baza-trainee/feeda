import { configureStore } from '@reduxjs/toolkit';

<<<<<<<<< Temporary merge branch 1:cms/src/redux/store/store.ts
import instructionsReducer from '../slices/instructions';
import participantsReducer from '../slices/participants';
import { reducer as projectsReducer } from '../slices/projects/projects';

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    participants: participantsReducer,
    authSlice: authSliceReducer,
    instructions: instructionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;