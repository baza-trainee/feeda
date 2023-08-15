import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { membersRole } from '~/src/components/SelectField/lists';

axios.defaults.baseURL = 'http://localhost:8000/user-project/';
axios.defaults.headers.Authorization = 'Token 81e6d032dc58be58e8274b05c6c21cd741149871';

const initialState: ParticipantsState = {
  list: [],
  participant: null,
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

// export const deleteParticipant = createAsyncThunk('participants/deleteParticipant', async (id: string) => {

export const sendEmail = createAsyncThunk('participants/sendEmail', async (userId: string) => {
  console.log('Id: ', userId);
  const { data } = await axios.get<any>(`send/${userId}/`);
  return data;
});

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
    builder.addCase(getParticipant.fulfilled, (state, { payload }) => {
      state.participant = { ...payload };
      // state.participant.type_participant =
      //   membersRole.find((item) => item.value === state.participant.type_participant.title.toLowerCase()) ||
      //   membersRole[6];
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
    // - - -
    builder.addCase(sendEmail.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(sendEmail.fulfilled, (state, { payload }) => {
      // state.list = payload;
      console.log(payload);
      state.isLoading = false;
    });
    builder.addCase(sendEmail.rejected, (state, { payload }) => {
      state.isLoading = false;
      console.log('Error: ', payload);
    });
  },
});

interface ParticipantsState {
  list: ParticipantData[];
  participant: ParticipantData | null;
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
