import { createSlice } from '@reduxjs/toolkit';

import { setNewPassword } from './operations';

export interface ChangePasswordType {
  changing: boolean;
  error: string | null;
}

const initialState: ChangePasswordType = {
  changing: false,
  error: null as string | null,
};

const changePasswordSlice = createSlice({
  name: 'changePassword',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setNewPassword.pending, (state) => {
        state.changing = true;
        state.error = null;
      })
      .addCase(setNewPassword.fulfilled, (state) => {
        state.changing = false;
        state.error = null;
      })
      .addCase(setNewPassword.rejected, (state, action) => {
        state.changing = false;
        state.error = action.payload as string;
      });
  },
});

export const changePasswordSliceReducer = changePasswordSlice.reducer;
