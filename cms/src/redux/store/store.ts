import { configureStore } from '@reduxjs/toolkit';

import { authSliceReducer, AuthStateTypes } from '../auth/loginSlice';
import { resetPasswordSliceReducer, ResetPasswordTypes } from '../auth/resetPasswordSlice';
import { changePasswordSliceReducer, ChangePasswordType } from '../auth/setNewPasswordSlice';
import participantsReducer from '../participants/reducer';
import { ParticipantsStateTypes } from '../participants/reducer';
import { reducer as projectsReducer } from '../projects/projects';
import { ProjectsState } from '../projects/projects.slice';

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    participants: participantsReducer,
    auth: authSliceReducer,
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
  resetPassword: ResetPasswordTypes;
  changePassword: ChangePasswordType;
};
