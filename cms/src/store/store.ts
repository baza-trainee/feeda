import { configureStore } from '@reduxjs/toolkit';

import instructionsReducer, { InstructionsStateType } from '../slices/instructions';
import participantsReducer from '../slices/participants/reducer';
import { ParticipantsStateTypes } from '../slices/participants/reducer';
import projecsReducer from '../slices/projects';
import { ProjectsState } from '../slices/projects';

export const store = configureStore({
  reducer: {
    projects: projecsReducer,
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
