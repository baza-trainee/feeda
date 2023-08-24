import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000/user-project/';
axios.defaults.headers.Authorization = 'Token b054b2b2d6d5fdb05ea5759787b684ef03670ffb';

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

export interface InstructionsStateType {
  specialities: null | IdNameType[];
  participation_types: null | IdNameType[];
  project_types: null | { project_type: string }[];
  isLoading: boolean;
  error: true | null;
}

export interface IdNameType {
  id: number;
  title: string;
}
