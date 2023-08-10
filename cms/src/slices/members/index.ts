import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState: MembersState = {
  list: [],
  loading: 'success',
};

export const fetchMembers = createAsyncThunk('members/fetchMembers', async () => {
  const { data } = await axios.get<MembersData[]>('http://localhost:8000/user-project/participants-list/', {
    headers: {
      Authorization: 'Token 778524f2b854fdb4aad7f9f1f748e6392a250f21', //implement auth,
    },
  });

  return data;
});

export const membersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMembers.pending, (state) => {
      state.loading = 'loading';
      console.log(state.loading);
    });
    builder.addCase(fetchMembers.fulfilled, (state, { payload }) => {
      state.list = payload;
      state.loading = 'success';
      console.log(state.loading);
    });
    builder.addCase(fetchMembers.rejected, (state) => {
      state.loading = 'rejected';
      console.log(state.loading);
    });
  },
});

interface MembersState {
  list: MembersData[];
  loading: 'loading' | 'success' | 'rejected';
}

interface MembersData {
  id: string;
  first_name: string;
  last_name: string;
  comment: string;
  phone_number: string;
  email: string;
  account_discord: string;
  account_linkedin: string;
  city: string;
  experience: boolean;
  stack: string;
  conditions_participation: boolean;
  processing_personal_data: boolean;
  speciality: object;
  project: object;
  type_participant: 'Безкоштовний' | 'Платний' | 'Буткамп';
}

export default membersSlice.reducer;
