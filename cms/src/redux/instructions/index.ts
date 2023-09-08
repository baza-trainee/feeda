import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/v1/';

const initialState: InstructionsStateType = {
  specialities: null,
  participation_types: null,
  project_types: null,
  project_status: null,
  isLoading: false,
  error: null,
};

export const getInstructions = createAsyncThunk('instructions/getInstructions', async () => {
  const specialities = await axios.get<{ results: SpecialitiesType[] }>('user-project/speciality-list/');
  const participation_types = await axios.get<{ results: ParticipantType[] }>('user-project/types-participant-list/');
  const project_types = await axios.get<{ results: ProjectTypes[] }>('user-project/types-project-list/');
  const project_status = await axios.get<{ results: ProjectStatusType[] }>('user-project/status-project-list/');

  const returnValue = {
    specialities: specialities.data.results,
    participation_types: participation_types.data.results,
    project_types: project_types.data.results,
    project_status: project_status.data.results,
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
      state.project_status = payload.project_status;
      state.isLoading = false;
    });
    builder.addCase(getInstructions.rejected, (state) => {
      state.error = true;
      console.log('Get instructions error: ', state.error);
      state.isLoading = false;
    });
  },
});

export default instructionsSlice.reducer;

export interface InstructionsStateType {
  specialities: null | SpecialitiesType[];
  participation_types: null | ParticipantType[];
  project_types: null | ProjectTypes[];
  project_status: null | ProjectStatusType[];
  isLoading: boolean;
  error: true | null;
}

export interface ProjectStatusType {
  id: number;
  status: string;
}

export interface ParticipantType {
  id: number;
  title: string;
}

export interface ProjectTypes {
  id: number;
  project_type: string;
}

export interface SpecialitiesType {
  id: number;
  title: string;
}

export interface IdNameType {
  id: number;
  title: string;
}
