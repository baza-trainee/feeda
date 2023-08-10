import { configureStore } from '@reduxjs/toolkit';

import membersReducer from '../slices/members';
import projecsReducer from '../slices/projects';

export const store = configureStore({
  reducer: {
    projects: projecsReducer,
    members: membersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
