import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';

const setAuthHeader = (token: string) => {
  axios.defaults.headers.common.Authorization = `Token ${token}`;
};

export const logIn = createAsyncThunk('auth/login', async (credentials: userForm, thunkAPI) => {
  try {
    const res = await axios.post('/users/login/', credentials);
    setAuthHeader(res.data.token);
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

// export const resetPassword = createAsyncThunk(
//   'auth/reset-password-email',
// async (email: string, thunkAPI) => {
//   const resetLink = `http://localhost:8000/reset-password?token=${resetToken}`;
//   const mailOptions = {
//     to: email,
//     subject: 'Password Reset',
//     html: `Click <a href="${resetLink}">here</a> to reset your password.`,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     return true;
//   } catch (error) {
//     return thunkAPI.rejectWithValue('Failed to send reset link.');
//   }
// }
// );
