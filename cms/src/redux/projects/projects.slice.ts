import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { deleteProject, fetchProjects, addProject, fetchTeam } from './actions';

const initialState: ProjectsState = {
  projects: [],
  loading: null,
  currentTeam: {},
  errors: null,
};

const { reducer, actions, name } = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProjects.pending, (state) => {
      console.log(state.loading);
    });
    builder.addCase(fetchProjects.fulfilled, (state, { payload }) => {
      state.projects = payload;
      console.log(state.loading);
      console.log('Fetching participants');
    });
    builder.addCase(fetchTeam.pending, (state) => {
      state.loading = 'loading';
    });
    builder.addCase(fetchTeam.fulfilled, (state, { payload }) => {
      state.currentTeam = payload;
    });
    builder.addCase(deleteProject.pending, (state) => {
      console.log(state.loading);
    });
    builder.addCase(deleteProject.fulfilled, (state) => {
      console.log(state.loading);
    });
    builder.addCase(addProject.pending, (state) => {
      console.log(state.loading);
    });
    builder.addCase(addProject.fulfilled, (state, { payload }) => {
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

export interface ProjectsState {
  projects: ProjectData[];
  currentTeam: ProjectTeam | {};
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

export interface ProjectTeam {
  id: string;
  project: {};
  user: {};
  team_lead: string;
}

export { actions, name, reducer };
