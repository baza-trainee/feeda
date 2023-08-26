import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { deleteProject, fetchProjects, addProject } from './actions';

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
      state.projects = payload;
      state.loading = 'success';
      console.log(state.loading);
    });
    builder.addCase(deleteProject.pending, (state) => {
      state.loading = 'loading';
      console.log(state.loading);
    });
    builder.addCase(deleteProject.fulfilled, (state, { payload }) => {
      state.loading = 'success';
      console.log(state.loading, payload);
    });
    builder.addCase(addProject.pending, (state) => {
      state.loading = 'loading';
      console.log(state.loading);
    });
    builder.addCase(addProject.fulfilled, (state, { payload }) => {
      state.loading = 'success';
      console.log(payload);
      console.log(state.loading, payload);
    });
    builder.addMatcher(
      isAnyOf(fetchProjects.rejected, deleteProject.rejected, addProject.rejected),
      (state, action) => {
        state.projects = [];
        state.loading = 'rejected';
        console.log(action.error.message);
        console.log(state.loading);
      }
    );
  },
});

interface ProjectsState {
  projects: ProjectData[];
  loading: 'loading' | 'success' | 'rejected' | null;
  errors: string | null;
}

export interface ProjectData {
  id: number;
  title: string;
  type_project: {
    project_type: string;
  };
  project_status: {
    status: string;
  };
  complexity: {
    complexity: string;
  };
  participants_count: string;
  start_date_project: string;
}

export { actions, name, reducer };
