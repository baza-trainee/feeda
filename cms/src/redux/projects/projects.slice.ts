import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { addProject, deleteProject, fetchProjects, fetchTeam, editProject } from './actions';
import { UserFormData } from '~/src/helpers/manageProjectFormData';

const initialState: ProjectsState = {
  projects: [],
  loading: null,
  currentTeam: {
    title: '',
    comment: '',
    complexity: null,
    status: null,
    type: null,
    address_site: '',
    start_date_project: '',
    end_date_project: '',
    users: [],
    team_leads: [],
    slug: '',
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
      console.log(payload);
      state.loading = 'success';
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
      state.loading = 'loading';
      console.log(state.loading);
    });
    builder.addCase(addProject.fulfilled, (state, { payload }) => {
      state.loading = 'success';
      console.log(payload);
      console.log(state.loading, payload);
    });
    builder.addCase(editProject.pending, (state) => {
      state.loading = 'loading';
      console.log(state.loading);
    });
    builder.addCase(editProject.fulfilled, (state, { payload }) => {
      state.loading = 'success';
      console.log(payload);
      state.currentTeam = payload;
      console.log(state.loading, payload);
    });
    builder.addMatcher(
      isAnyOf(fetchProjects.rejected, deleteProject.rejected, addProject.rejected, editProject.rejected),
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
  currentTeam: ProjectTeamState;
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
  url: string;
}

export interface ProjectTeamState {
  title: string;
  comment: string;
  complexity: number | null;
  status: string | null;
  type: string | null;
  address_site: string | null;
  start_date_project: string | null;
  end_date_project: string | null;
  users: UserFormData[] | [];
  team_leads: UserFormData[] | [];
  slug: string;
}

export { actions, name, reducer };
