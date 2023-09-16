import { createSlice } from '@reduxjs/toolkit';

import { deleteProject, fetchProjects } from './actions';

const initialState: ProjectsState = {
  projects: [],
  loading: null,
  errors: null,
};

const { reducer, actions, name } = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProjects.pending, (state) => {
      state.loading = 'loading';
      console.log(state.loading);
    });
    builder.addCase(fetchProjects.fulfilled, (state, { payload }) => {
      state.projects = payload.results;
      console.log(payload.results);
      state.loading = 'success';
      console.log(state.loading);
      console.log('Fetching participants');
    });
    builder.addCase(fetchProjects.rejected, (state, action) => {
      state.projects = [];
      state.loading = 'rejected';
      console.log(action.error.message);
      console.log(state.loading);
    });
    builder.addCase(deleteProject.pending, (state) => {
      state.loading = 'loading';
      console.log(state.loading);
    });
    builder.addCase(deleteProject.fulfilled, (state) => {
      state.loading = 'success';
      console.log(state.loading);
    });
    builder.addCase(deleteProject.rejected, (state, action) => {
      state.projects = [];
      state.loading = 'rejected';
      console.log(action.error.message);
      console.log(state.loading);
    });
  },
});

export interface ProjectsState {
  projects: ProjectData[];
  loading: 'loading' | 'success' | 'rejected' | null;
  errors: string | null;
}

export interface ProjectData {
  id: number;
  title: string;
  type: string;
  status: string;
  complexity: string;
  count_participants: string;
  start_date_project: string;
}

export { actions, name, reducer };
