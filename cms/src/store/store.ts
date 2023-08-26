import { configureStore } from '@reduxjs/toolkit';

import { authSliceReducer } from '../app/(auth)/authOperations/slice';
import participantsReducer from '../slices/participants';
import projecsReducer from '../slices/projects';

export const store = configureStore({
  reducer: {
    projects: projecsReducer,
    participants: participantsReducer,
    authSlice: authSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
