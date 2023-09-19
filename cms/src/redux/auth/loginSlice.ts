import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { logIn } from './operations';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    loading: false,
    error: null as string | null,
    remember: false,
  },
  reducers: {
    loginByToken: (state, action) => {
      state.token = action.payload;
      axios.defaults.headers.Authorization = `Token ${action.payload}`;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logIn.pending, (state) => {
        state.token = null;
        state.loading = true;
        state.error = null;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.remember = action.payload.remember;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.token = null;
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export interface AuthStateTypes {
  token: string | null;
  loading: boolean;
  error: string | null;
}
export const authSliceReducer = authSlice.reducer;
export const { loginByToken } = authSlice.actions;
