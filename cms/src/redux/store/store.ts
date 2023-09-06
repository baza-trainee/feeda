import { configureStore } from '@reduxjs/toolkit';

import { authSliceReducer, AuthStateTypes } from '../auth/loginSlice';
import { resetPasswordSliceReducer, ResetPasswordTypes } from '../auth/resetPasswordSlice';
import { changePasswordSliceReducer, ChangePasswordType } from '../auth/setNewPasswordSlice';
import instructionsReducer, { InstructionsStateType } from '../instructions';
import participantsReducer from '../participants/reducer';
import { ParticipantsStateTypes } from '../participants/reducer';
import { reducer as projectsReducer } from '../projects/projects';
import { ProjectsState } from '../projects/projects.slice';
import { authSliceReducer } from '../slices/auth/loginSlice';

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    participants: participantsReducer,
    auth: authSliceReducer,
    instructions: instructionsReducer,
    resetPassword: resetPasswordSliceReducer,
    changePassword: changePasswordSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type StoreTypes = {
  auth: AuthStateTypes;
  projects: ProjectsState;
  participants: ParticipantsStateTypes;
  instructions: InstructionsStateType;
  resetPassword: ResetPasswordTypes;
  changePassword: ChangePasswordType;
};
