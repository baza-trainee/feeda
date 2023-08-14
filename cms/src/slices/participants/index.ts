import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000/user-project/';
axios.defaults.headers.Authorization = 'Token d27095b128eef9d7d8c2060e6187982a71257c6a';

const initialState: ParticipantsState = {
  list: [],
  isLoading: false,
  error: null,
};

export const fetchParticipants = createAsyncThunk('participants/fetchParticipants', async () => {
  const { data } = await axios.get<ParticipantData[]>('participants-list/');
  return data;
});

export const createParticipant = createAsyncThunk('participants/createParticipant', async (formData: object) => {
  console.log('Request: ', formData);
  const { data } = await axios.post<any>('add-participant/', formData);
  return data;
});

export const getParticipant = createAsyncThunk('participants/getParticipant', async (id: string) => {
  const { data } = await axios.get<ParticipantData>(`get-participant/${id}/`);
  return data;
});

export const updateParticipant = createAsyncThunk(
  'participants/updateParticipant',
  async ({ formData, userId }: { formData: object; userId: string }) => {
    console.log('Id: ', userId);
    console.log('Data: ', formData);
    const { data } = await axios.put<ParticipantData>(`participant-detail/${userId}`, formData);
    return data;
  }
);

export const participantsSlice = createSlice({
  name: 'participants',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchParticipants.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchParticipants.fulfilled, (state, { payload }) => {
      state.list = payload;
      state.isLoading = false;
    });
    builder.addCase(fetchParticipants.rejected, (state) => {
      state.isLoading = false;
    });
    // - - -
    builder.addCase(createParticipant.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createParticipant.fulfilled, (state, { payload }) => {
      // state.list = payload;
      console.log(payload);
      state.isLoading = false;
    });
    builder.addCase(createParticipant.rejected, (state, { payload }) => {
      state.isLoading = false;
      console.log('Error: ', payload);
    });
    // - - -
    builder.addCase(getParticipant.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getParticipant.fulfilled, (state) => {
      // state.list = payload;
      state.isLoading = false;
    });
    builder.addCase(getParticipant.rejected, (state, { payload }) => {
      state.isLoading = false;
      console.log('Error: ', payload);
    });
    // - - -
    builder.addCase(updateParticipant.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateParticipant.fulfilled, (state, { payload }) => {
      // state.list = payload;
      console.log(payload);
      state.isLoading = false;
    });
    builder.addCase(updateParticipant.rejected, (state, { payload }) => {
      state.isLoading = false;
      console.log('Error: ', payload);
    });
  },
});

interface ParticipantsState {
  list: ParticipantData[];
  isLoading: boolean;
  error: string | null;
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
  project: string[];
  // type_participant: 'Безкоштовний' | 'Платний' | 'Буткамп';
}

export default participantsSlice.reducer;
