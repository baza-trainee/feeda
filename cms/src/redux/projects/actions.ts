import { FieldValues } from 'react-hook-form';

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { format } from 'date-fns';

import { getInstructions } from '../instructions';
import { RootState } from '../store/store';
import { ActionType } from './common';
import { ProjectTeam } from './projects.slice';

const fetchProjects = createAsyncThunk(ActionType.GET_ALL, async () => {
  const { data } = await axios.get('http://localhost:8000/user-project/projects/');
  return data.results; /// TEMP PAGINATION
});

const deleteProject = createAsyncThunk(
  ActionType.DELETE_PROJECT,
  async (title: string | number | null, { dispatch }) => {
    try {
      await axios.delete(`http://localhost:8000/user-project/project/${title}`);
      await dispatch(fetchProjects());
      return;
    } catch (err) {
      console.log('Delete error: ', err);
    }
  }
);

const addProject = createAsyncThunk(ActionType.ADD_PROJECT, async (formData: FieldValues) => {
  const projectData: ProjectDataParams = {
    title: formData.title,
    comment: formData.comment,
    type_project: Number(formData.project_status.value) || 2, /// GET INSTRUCTIONS
    complexity: Number(formData.complixity.value) || 2, /// GET INSTRUCTIONS
    project_status: Number(formData.project_status.value) || 1, ///  /// GET INSTRUCTIONS
    start_date_project: format(formData.start_date_project, 'yyyy-MM-dd'),
    end_date_project: formData.start_date_project ? format(formData.start_date_project, 'yyyy-MM-dd') : '2023-12-31',
    address_site: formData.address_site,
  };

  console.log('dispatch', projectData);
  const { data } = await axios.post('http://localhost:8000/user-project/create-project/', projectData);

  const teamData: { team_lead: string; user: string[]; project: string } = {
    team_lead: 'f7d31f25-36d2-4ab9-98ed-1aa8aa5e29c6',
    user: ['f7d31f25-36d2-4ab9-98ed-1aa8aa5e29c6', 'e81be77f-ec88-4e94-9ab5-236ac428d15b'],
    project: data.project.id.toString(),
  };

  const response = await axios.put(`http://localhost:8000/user-project/command-update/${data.command.id}/`, teamData);

  const combinedData = { project: data, team: response.data };

  return combinedData;
});

const fetchTeam = createAsyncThunk(ActionType.GET_TEAM, async (title: string, thunkAPI) => {
  await thunkAPI.dispatch(getInstructions());
  const { instructions } = (await thunkAPI.getState()) as RootState;

  const { data } = await axios.get<{ team_lead: string; project: ProjectDataParams; user: userDataParams[] }>(
    `http://localhost:8000/user-project/command-project-detail/${title}/`
  );

  let currentStatus: { id: number; status: string } | undefined;
  let currentType: { id: number; project_type: string } | undefined;

  if (instructions.project_status) {
    currentStatus = instructions.project_status.find((item) => item.id === data.project.project_status);
  }

  if (instructions.project_types) {
    currentType = instructions.project_types.find((item) => item.id === data.project.type_project);
  }

  const { project, user } = data;

  const currentTeam: ProjectTeam = {
    title: project.title,
    comment: project.comment,
    complexity: project.complexity,
    project_status: currentStatus?.status || '',
    type_project: currentType?.project_type || '',
    address_site: project.address_site || '',
    start_date_project: project.start_date_project || '2023-01-01',
    end_date_project: project.end_date_project || '2023-01-01',
    // team_lead: team_lead || '',
    user:
      user.map((user) => {
        const memberRole = user.speciality
          ? instructions.specialities?.find((item) => item.title === user.speciality?.title) || ''
          : '';

        return {
          full_name: {
            label: `${user.first_name} ${user.last_name}`,
            value: user.id,
          },
          membersRole: memberRole ? memberRole.title : 'None',
          comment: user.comment || '',
        };
      }) || [],
  };

  return currentTeam;
});

export interface ProjectDataParams {
  id?: string;
  title: string;
  comment: string;
  type_project: number;
  complexity: number;
  project_status: number;
  start_date_project: string;
  end_date_project?: string | null;
  address_site?: string | null;
  url?: string;
}

export interface TeamDataParams {
  team_lead?: string | null;
  user: userDataParams[];
  project: ProjectDataParams;
}

export interface userDataParams {
  id: string;
  first_name: string;
  last_name: string;
  speciality: {
    id: number;
    title: string;
  } | null;
  comment: string | null;
}

export { fetchProjects, deleteProject, addProject, fetchTeam };
