import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { addProject, deleteProject, fetchProjects, fetchTeam, userDataParams } from './actions';

const initialState: ProjectsState = {
  projects: [],
  loading: null,
  currentTeam: {
    title: '',
    comment: '',
    complexity: null,
    project_status: null,
    type_project: null,
    address_site: '',
    start_date_project: '',
    end_date_project: '',
    user: {},
  },
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
      state.loading = 'success';
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
  currentTeam: ProjectTeam;
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
  url: string;
}

export interface ProjectTeam {
  title: string;
  comment: string;
  complexity: number | null;
  project_status: string | null;
  type_project: string | null;
  address_site: string | null;
  start_date_project: string | null;
  end_date_project: string | null;
  user: userDataParams | object;
}

export { actions, name, reducer };
