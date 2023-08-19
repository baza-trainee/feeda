import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000/user-project/';
axios.defaults.headers.Authorization = 'Token 2f2691a9e0585570f09d180ef9b10b922f96106b';

const initialState: InstructionsStateType = {
  isLoading: false,
  error: null,
};

export const getSpecialities = createAsyncThunk('instructions/getSpecialities', async () => {
  //   const specialities  = await axios.get<ParticipantData[]>('specialities-list/');
  const { data } = await axios.get('speciality-list/');
  return data;
});

export const getTypesParticipation = createAsyncThunk('instructions/getTypesParticipation', async () => {
  //   const specialities  = await axios.get<ParticipantData[]>('specialities-list/');
  const { data } = await axios.get('types-participant-list/');
  return data;
});
export const getTypesProject = createAsyncThunk('instructions/getTypesProject', async () => {
  //   const specialities  = await axios.get<ParticipantData[]>('specialities-list/');
  const { data } = await axios.get('types-project-list/');
  return data;
});

export const instructionsSlice = createSlice({
  name: 'instructions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSpecialities.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getSpecialities.fulfilled, (state, { payload }) => {
      //   state.list = payload;
      console.log(payload);
      state.isLoading = false;
    });
    builder.addCase(getSpecialities.rejected, (state) => {
      state.isLoading = false;
    });

    // - - - -

    builder.addCase(getTypesParticipation.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getTypesParticipation.fulfilled, (state, { payload }) => {
      //   state.list = payload;
      console.log(payload);
      state.isLoading = false;
    });
    builder.addCase(getTypesParticipation.rejected, (state) => {
      state.isLoading = false;
    });

    // - - - -

    builder.addCase(getTypesProject.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getTypesProject.fulfilled, (state, { payload }) => {
      //   state.list = payload;
      console.log(payload);
      state.isLoading = false;
    });
    builder.addCase(getTypesProject.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default instructionsSlice.reducer;

interface InstructionsStateType {
  //   list: ParticipantData[];
  //   participant: ParticipantData | null;
  isLoading: boolean;
  error: string | null;
}

// export interface ParticipantData {
//   id: string;
//   first_name: string;
//   last_name: string;
//   comment: string;
//   phone_number: string;
//   email: string;
//   account_discord: string;
//   account_linkedin: string;
//   city: string;
//   experience: boolean;
//   stack: string;
//   conditions_participation: boolean;
//   processing_personal_data: boolean;
//   speciality: object;
//   project: string[];
//   // type_participant: 'Безкоштовний' | 'Платний' | 'Буткамп';
// }
