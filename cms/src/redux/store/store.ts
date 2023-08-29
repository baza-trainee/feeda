import { configureStore } from '@reduxjs/toolkit';

import instructionsReducer, { InstructionsStateType } from '../instructions';
import participantsReducer from '../participants/reducer';
import { ParticipantsStateTypes } from '../participants/reducer';
import { reducer as projectsReducer } from '../projects/projects';
import { ProjectsState } from '../projects/projects.slice';

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

export type StoreTypes = {
  projects: ProjectsState;
  participants: ParticipantsStateTypes;
  instructions: InstructionsStateType;
};
