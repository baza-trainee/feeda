import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000/user-project/';
axios.defaults.headers.Authorization = 'Token 778524f2b854fdb4aad7f9f1f748e6392a250f21';

const initialState: ParticipantsState = {
  list: [],
  loading: 'success',
};

export const fetchParticipants = createAsyncThunk('participants/fetchParticipants', async () => {
  const { data } = await axios.get<ParticipantData[]>('participants-list/');
  return data;
});

export const createParticipant = createAsyncThunk('participants/createParticipant', async (formData: object) => {
  console.log('Request: ', formData);
  const { data } = await axios.post<ParticipantData[]>('add-participant/', formData);
  return data;
});

export const participantsSlice = createSlice({
  name: 'participants',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchParticipants.pending, (state) => {
      state.loading = 'loading';
      console.log(state.loading);
    });
    builder.addCase(fetchParticipants.fulfilled, (state, { payload }) => {
      state.list = payload;
      state.loading = 'success';
      console.log(state.loading);
    });
    builder.addCase(fetchParticipants.rejected, (state) => {
      state.loading = 'rejected';
      console.log(state.loading);
    });
    // - - -
    builder.addCase(createParticipant.pending, (state) => {
      state.loading = 'loading';
      console.log(state.loading);
    });
    builder.addCase(createParticipant.fulfilled, (state, { payload }) => {
      // state.list = payload;
      console.log(payload);
      state.loading = 'success';
      console.log(state.loading);
    });
    builder.addCase(createParticipant.rejected, (state, { payload }) => {
      state.loading = 'rejected';
      console.log(state.loading);
      console.log('Error: ', payload);
    });
  },
});

interface ParticipantsState {
  list: ParticipantData[];
  loading: 'loading' | 'success' | 'rejected';
}

export interface ParticipantData {
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

export default participantsSlice.reducer;
