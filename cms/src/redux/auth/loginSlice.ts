import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { logIn, logOut } from './operations';

const initialState: AuthStateTypes = {
  token: null,
  loading: false,
  error: null,
  remember: false,
  isLoggedIn: false,
  email: null,
  pass: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginByToken: (state, { payload }) => {
      axios.defaults.headers.Authorization = `Bearer ${payload.token}`;
      state = { ...state };
      state.token = payload.token;
      state.remember = payload.remember || false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logIn.pending, (state) => {
        state = { ...state };
        state.loading = true;
      })
      .addCase(logIn.fulfilled, (state, { payload }) => {
        state.isLoggedIn = true;
        state.loading = false;
        state.token = payload.token;
        state.remember = payload.remember;
        state.email = payload.email || null;
        state.pass = payload.password || null;
      })
      .addCase(logIn.rejected, (state, { payload }) => {
        state = { ...state };
        state.isLoggedIn = false;
        state.loading = false;
        if (typeof payload === 'string') state.error = payload;
        else state.error = true;
        console.log('Error: ', payload);
      })
      .addCase(logOut.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.loading = false;
        state.token = null;
        state.remember = false;
        state.email = null;
        state.pass = null;
      });
  },
});

export interface AuthStateTypes {
  token: string | null;
  loading: boolean;
  error: string | null | boolean;
  remember: boolean;
  isLoggedIn: boolean;
  email?: string | null;
  pass?: string | null;
}
export const authSliceReducer = authSlice.reducer;
export const { loginByToken } = authSlice.actions;
