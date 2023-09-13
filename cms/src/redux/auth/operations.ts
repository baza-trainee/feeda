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
      const { data } = await axios.post('api/v1/users/login/', credentials);
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

export const resetPassword = createAsyncThunk('auth/resetPassword', async (email: string, thunkAPI) => {
  try {
    await axios.post('/users/reset-password-email/', email);
  } catch (error) {
    if (error instanceof AxiosError) {
      return thunkAPI.rejectWithValue(error.message);
    } else throw Error;
  }
});

export const setNewPassword = createAsyncThunk('auth/setNewPassword', async (credentials: changeForm, thunkAPI) => {
  try {
    await axios.patch('/users/password-reset-complete/', credentials);
    // const res = await axios.post('/users/password-reset-complete/', credentials);
    // console.log(res.data);
    // return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return thunkAPI.rejectWithValue(error.message);
    } else throw Error;
  }
});

export interface changeForm {
  confirm_password: string;
  password: string;
  token: string;
  uidb64: string;
}
