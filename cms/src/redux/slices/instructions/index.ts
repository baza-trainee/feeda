import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000/user-project/';
axios.defaults.headers.Authorization = 'Token 624e3e488cdc0f0c0f57a197c05068b4b5c2cfd5';

const initialState: InstructionsStateType = {
  specialities: null,
  participation_types: null,
  project_types: null,
  isLoading: false,
  error: null,
};

export const getInstructions = createAsyncThunk('instructions/getInstructions', async () => {
  const specialities = await axios.get<IdNameType[]>('speciality-list/');
  const participation_types = await axios.get<IdNameType[]>('types-participant-list/');
  const project_types = await axios.get<{ project_type: string }[]>('types-project-list/');
  const returnValue = {
    specialities: specialities.data,
    participation_types: participation_types.data,
    project_types: project_types.data,
  };
  return returnValue;
});

export const instructionsSlice = createSlice({
  name: 'instructions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getInstructions.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getInstructions.fulfilled, (state, { payload }) => {
      state.specialities = payload.specialities;
      state.participation_types = payload.participation_types;
      state.project_types = payload.project_types;
      state.isLoading = false;
    });
    builder.addCase(getInstructions.rejected, (state) => {
      state.error = true;
      console.log(state.error);
      state.isLoading = false;
    });
  },
});

export default instructionsSlice.reducer;

interface InstructionsStateType {
  specialities: null | IdNameType[];
  participation_types: null | IdNameType[];
  project_types: null | { project_type: string }[];
  isLoading: boolean;
  error: true | null;
}

export interface IdNameType {
  id: number;
  name: string;
}
