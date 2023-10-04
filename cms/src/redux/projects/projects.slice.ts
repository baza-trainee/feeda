import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { UserFormData } from '~/src/helpers/manageProjectFormData';

import { addProject, deleteProject, editProject, fetchProjects, fetchTeam } from './actions';
import { SelectDifficultyType, SelectStateIconType } from '~/src/components/SelectField/SelectField.style';

const initialState: ProjectsState = {
  projects: [],
  loading: null,
  currentTeam: {
    id: '',
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
    count_participants: 0,
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
  projects: ProjectTeamState[];
  currentTeam: ProjectTeamState;
  loading: 'loading' | 'success' | 'rejected' | null;
  errors: string | null;
}

export interface ProjectData {
  count: number | null;
  next: number | null;
  previous: number | null;
  results: ProjectTeamState[];
}

export interface ProjectTeamState {
  id: string;
  title: string;
  comment: string;
  complexity: SelectDifficultyType;
  status: SelectStateIconType;
  type: string | null;
  address_site: string | null;
  start_date_project: string | null;
  end_date_project: string | null;
  users: UserFormData[] | [];
  team_leads: UserFormData[] | [];
  slug: string;
  count_participants: number;
}

export { actions, name, reducer };
