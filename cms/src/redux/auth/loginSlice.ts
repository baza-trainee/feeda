import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { logIn } from './operations';

const initialState: AuthStateTypes = {
  token: null,
  loading: false,
  error: null,
  remember: false,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginByToken: (state, action) => {
      state.token = action.payload;
      axios.defaults.headers.Authorization = `Bearer ${action.payload}`;
      state.error = null;
      state.isLoggedIn = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logIn.pending, (state) => {
        state.token = null;
        state.loading = true;
        state.error = null;
      })
      .addCase(logIn.fulfilled, (state, { payload }) => {
        state.isLoggedIn = true;
        state.loading = false;
        state.token = payload.token;
        state.remember = payload.remember;
      })
      .addCase(logIn.rejected, (state, { payload }) => {
        state.isLoggedIn = false;
        state.token = null;
        state.loading = false;
        if (typeof payload === 'string') state.error = payload;
        else state.error = true;
        console.log('Error: ', payload);
      });
  },
});

export interface AuthStateTypes {
  token: string | null;
  loading: boolean;
  error: string | null | boolean;
  remember: boolean;
  isLoggedIn: boolean;
}
export const authSliceReducer = authSlice.reducer;
export const { loginByToken } = authSlice.actions;
