import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';

const setAuthHeader = (token: string) => {
  axios.defaults.headers.Authorization = `Token ${token}`;
};

export const logIn = createAsyncThunk(
  'auth/login',
  async ({ credentials, remember }: { credentials: userForm; remember: boolean }, thunkAPI) => {
    try {
      const { data } = await axios.post('/users/login/', credentials);
      setAuthHeader(data.token);
      return { ...data, remember };
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.message);
      } else throw Error;
    }
  }
);

export interface userForm {
  email: string;
  password: string;
}

export const resetPassword = createAsyncThunk('auth/reset-password-email', async (email: string, thunkAPI) => {
  try {
    const result = axios.post('/reset-password-email/', email);
    return result;
  } catch (error) {
    return thunkAPI.rejectWithValue('Failed to send reset link.');
  }
});
