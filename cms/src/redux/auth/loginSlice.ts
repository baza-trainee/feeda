import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { logIn } from '../../app/(auth)/authOperations/operations';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    loading: false,
    isLogged: false,
    error: null as string | null,
  },
  reducers: {
    loginByToken: (state, action) => {
      state.token = action.payload;
      axios.defaults.headers.Authorization = `Token ${action.payload}`;
      state.isLogged = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logIn.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.token = null;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.token = action.payload;
        state.isLogged = true;
        state.loading = false;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.error = action.error.message || null;
        state.loading = false;
      });
  },
});

export const authSliceReducer = authSlice.reducer;
export const { loginByToken } = authSlice.actions;
