import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';

const setAuthHeader = (token:string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};


export const logIn = createAsyncThunk('auth/login', async (credentials,thunkAPI) => {
  try {
    const res = await axios.post('/users/login', credentials);
    // setAuthHeader(res.data.token);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

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