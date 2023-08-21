import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState: ProjectsState = {
  projects: [],
  loading: 'success',
};

export const fetchProjects = createAsyncThunk('projects/fetchProjects', async () => {
  const { data } = await axios.get<ProjectData[]>('http://localhost:8000/user-project/projects/', {
    headers: {
      Authorization: 'Token d27095b128eef9d7d8c2060e6187982a71257c6a', //implement auth,
    },
  });

  return data;
});

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProjects.pending, (state) => {
      state.loading = 'loading';
      console.log(state.loading);
    });
    builder.addCase(fetchProjects.fulfilled, (state, { payload }) => {
      state.projects = payload;
      state.loading = 'success';
      console.log(state.loading);
    });
    builder.addCase(fetchProjects.rejected, (state) => {
      state.projects = [];
      state.loading = 'rejected';
      console.log(state.loading);
    });
  },
});

export interface ProjectsState {
  projects: ProjectData[];
  loading: 'loading' | 'success' | 'rejected';
}

export interface ProjectData {
  id: number;
  title: string;
  start_date_project: string;
  complexity: {
    complexity: string;
  };
}

export default projectsSlice.reducer;
