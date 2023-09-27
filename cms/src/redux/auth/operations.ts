import { createAsyncThunk, SerializedError } from '@reduxjs/toolkit';
import axios, { AxiosError, AxiosResponse } from 'axios';

import { RootState } from '../store/store';

axios.defaults.baseURL = 'http://localhost:8000/api/v1/';

const setAuthHeader = (token: string) => {
  axios.defaults.headers.Authorization = `Bearer ${token}`;
};

export type UserForm = {
  email: string;
  password: string;
};

type LoginResponse = {
  token: string;
  remember: boolean;
  email?: string;
  password?: string;
};

type ResetPasswordResponse = {
  email: string;
};

export type ChangeForm = {
  confirm_password: string;
  password: string;
  token: string;
  uidb64: string;
};

export const logIn = createAsyncThunk<LoginResponse, { credentials: UserForm; remember: boolean }>(
  'auth/login',
  async ({ credentials, remember }, thunkAPI) => {
    try {
      const { data } = await axios.post('/users/login/', credentials);
      setAuthHeader(data.token);
      if (remember) {
        localStorage.setItem('remember', remember.toString());
      }
      return { ...data, remember, ...(remember && credentials) };
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.message);
      } else throw error;
    }
  }
);

export const resetPassword = createAsyncThunk<
  ResetPasswordResponse,
  string,
  {
    rejectValue: SerializedError;
  }
>('auth/resetPassword', async (email, thunkAPI) => {
  try {
    const response: AxiosResponse<ResetPasswordResponse> = await axios.post('/users/reset-password-email/', email);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const serializedError: SerializedError = {
        name: 'ResetPasswordError',
        message: error.message,
        code: 'AXIOS_ERROR',
      };
      return thunkAPI.rejectWithValue(serializedError);
    }
    throw error;
  }
});

export const setNewPassword = createAsyncThunk<
  ChangeForm,
  { password: string; confirm_password: string },
  {
    rejectValue: SerializedError;
    state: RootState;
  }
>('auth/setNewPassword', async (credentials, thunkAPI) => {
  try {
    const response: AxiosResponse<ChangeForm> = await axios.patch('/users/password-reset-complete/', credentials);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const serializedError: SerializedError = {
        name: 'SetNewPasswordError',
        message: error.message,
        code: 'AXIOS_ERROR',
      };
      return thunkAPI.rejectWithValue(serializedError);
    } else throw error;
  }
});
