import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';

export const logIn = createAsyncThunk('auth/login', async (credentials: userForm, thunkAPI) => {
  try {
    const res = await axios.post('/users/login/', credentials);
    console.log(res.data);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return thunkAPI.rejectWithValue(error.message);
    } else throw Error;
  }
});

export interface userForm {
  email: string;
  password: string;
}

export const resetPassword = createAsyncThunk('reset/resetPassword', async (credentials: resetForm, thunkAPI) => {
  try {
    const res = await axios.post('/users/reset-password-email/', credentials);
    console.log(res.data);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return thunkAPI.rejectWithValue(error.message);
    } else throw Error;
  }
});

export interface resetForm {
  email: string;
}

export const setNewPassword = createAsyncThunk('changePassword/resetPassword', async (credentials: changeForm, thunkAPI) => {
  try {
    const res = await axios.post('/users/password-reset-complete/', credentials);
    console.log(res.data);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return thunkAPI.rejectWithValue(error.message);
    } else throw Error;
  }
});

export interface changeForm {
  repeatNewPassword: string;
  newPassword:string;
}