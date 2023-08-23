import { configureStore } from '@reduxjs/toolkit';

import instructionsReducer, { InstructionsStateType } from '../slices/instructions';
import participantsReducer from '../slices/participants/reducer';
import { ParticipantsStateTypes } from '../slices/participants/reducer';
import { reducer as projectsReducer } from '../slices/projects/projects';
import { ProjectsState } from '../slices/projects/projects.slice';

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    participants: participantsReducer,
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
