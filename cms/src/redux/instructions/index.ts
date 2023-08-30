import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000/user-project/';
//axios.defaults.headers.Authorization = 'Token 624e3e488cdc0f0c0f57a197c05068b4b5c2cfd5';

const initialState: InstructionsStateType = {
  specialities: null,
  participation_types: null,
  project_types: null,
  project_status: null,
  isLoading: false,
  error: null,
};

export const getInstructions = createAsyncThunk('instructions/getInstructions', async () => {
  const specialities = await axios.get<IdNameType[]>('speciality-list/', {
    headers: {
      Authorization: 'Token 624e3e488cdc0f0c0f57a197c05068b4b5c2cfd5',
    },
  });
  const participation_types = await axios.get<IdNameType[]>('types-participant-list/', {
    headers: {
      Authorization: 'Token 624e3e488cdc0f0c0f57a197c05068b4b5c2cfd5',
    },
  });
  const project_types = await axios.get<{ id: number; project_type: string }[]>('types-project-list/', {
    headers: {
      Authorization: 'Token 624e3e488cdc0f0c0f57a197c05068b4b5c2cfd5',
    },
  });
  const project_status = await axios.get<{ id: number; status: string }[]>('/status-project-list/', {
    headers: {
      Authorization: 'Token 624e3e488cdc0f0c0f57a197c05068b4b5c2cfd5',
    },
  });
  const returnValue = {
    specialities: specialities.data,
    participation_types: participation_types.data,
    project_types: project_types.data,
    project_status: project_status.data,
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
  specialities: null | IdNameType[];
  participation_types: null | IdNameType[];
  project_types: null | { id: number; project_type: string }[];
  project_status: null | { id: number; status: string }[];
  isLoading: boolean;
  error: true | null;
}

export interface IdNameType {
  id: number;
  title: string;
}
