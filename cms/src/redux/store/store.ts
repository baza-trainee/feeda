import { Action, configureStore, Dispatch, Middleware, MiddlewareAPI, ThunkAction } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import thunk from 'redux-thunk';

import { authSliceReducer, AuthStateTypes } from '../auth/loginSlice';
import { resetPasswordSliceReducer, ResetPasswordTypes } from '../auth/resetPasswordSlice';
import { changePasswordSliceReducer, ChangePasswordType } from '../auth/setNewPasswordSlice';
import participantsReducer from '../participants/reducer';
import { ParticipantsStateTypes } from '../participants/reducer';
import { reducer as projectsReducer } from '../projects/projects';
import { ProjectsState } from '../projects/projects.slice';
import { authSliceReducer } from '../slices/auth/loginSlice';

const encryptor = encryptTransform({
  secretKey: 'Super-Secret-key-jrtec',
  onError: function (error) {
    console.log('error', error);
    // Handle the error.
  },
});

const persistConfig = {
  key: 'auth',
  storage: storage,
  transforms: [encryptor],
};

const persistedAuthReducer = persistReducer(persistConfig, authSliceReducer);

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const customMiddleware: Middleware = (store: MiddlewareAPI) => (next: Dispatch<Action>) => (action: Action) => {
  const result = next(action);
  return result;
};

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    participants: participantsReducer,
    auth: persistedAuthReducer,
    resetPassword: resetPasswordSliceReducer,
    changePassword: changePasswordSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
      immutableCheck: true,
      actionCreatorCheck: true,
    }).concat(thunk, customMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type StoreTypes = {
  auth: AuthStateTypes;
  projects: ProjectsState;
  participants: ParticipantsStateTypes;
  resetPassword: ResetPasswordTypes;
  changePassword: ChangePasswordType;
};

export const persistor = persistStore(store);
