import { createSlice } from '@reduxjs/toolkit';

import { resetPassword } from './operations';

export interface ResetPasswordTypes {
  emailSent: boolean;
  resetInProgress: boolean;
  resetError: string | null;
}

const initialState: ResetPasswordTypes = {
  emailSent: false,
  resetInProgress: false,
  resetError: null,
};

const resetPasswordSlice = createSlice({
  name: 'reset',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(resetPassword.pending, (state) => {
        state.resetInProgress = true;
        state.resetError = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.emailSent = true;
        state.resetInProgress = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.resetInProgress = false;
        state.resetError = action.payload as string;
      });
  },
});

export const resetPasswordSliceReducer = resetPasswordSlice.reducer;
