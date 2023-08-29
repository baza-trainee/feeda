import { createSlice } from '@reduxjs/toolkit';

import { logIn } from '../../../app/(auth)/authOperations/operations';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logIn.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.token = null;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        state.error = null;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
        state.token = null;
      });
  },
});

export const authSliceReducer = authSlice.reducer;
