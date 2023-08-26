import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';

const setAuthHeader = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const logIn = createAsyncThunk('auth/login', async (credentials: userForm, thunkAPI) => {
  try {
    const res = await axios.post('/users/login/', credentials);
    // setAuthHeader(res.data.token);
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

// export const logIni = createAsyncThunk(
//   'auth/login',
//   async (credentials, thunkAPI) => {
//     try {
//       const res = await axios.post('/users/login', credentials);
//       setAuthHeader(res.data.token);
//       return res.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );
