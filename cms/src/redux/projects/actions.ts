import { FieldValues } from 'react-hook-form';

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { format } from 'date-fns';

import { getInstructions } from '../instructions';
import { RootState } from '../store/store';
import { ActionType } from './common';
import { ProjectTeam } from './projects.slice';

const fetchProjects = createAsyncThunk(ActionType.GET_ALL, async () => {
  const { data } = await axios.get('http://127.0.0.1:8000/api/v1/user-project/projects/');
  return data.results; /// TEMP PAGINATION
});

const deleteProject = createAsyncThunk(
  ActionType.DELETE_PROJECT,
  async (title: string | number | null, { dispatch }) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/v1/user-project/project/${title}`);
      await dispatch(fetchProjects());
      return;
    } catch (err) {
      console.log('Delete error: ', err);
    }
  }
);

const addProject = createAsyncThunk(ActionType.ADD_PROJECT, async (formData: FieldValues, thunkAPI) => {
  await thunkAPI.dispatch(getInstructions());
  const { instructions } = (await thunkAPI.getState()) as RootState;

  let currentStatus: { id: number; status: string } | undefined;
  let currentType: { id: number; project_type: string } | undefined;

  if (instructions.project_status) {
    currentStatus = instructions.project_status.find((item) => item.status === formData.project_status);
  }

  if (instructions.project_types) {
    currentType = instructions.project_types.find((item) => item.project_type === formData.type_project);
  }

  console.log(currentType);

  const projectData: ProjectDataParams = {
    title: formData.title,
    comment: formData.comment,
    type_project: currentType?.id || 1,
    complexity: formData.complexity,
    project_status: currentStatus?.id || 1,
    start_date_project: format(formData.start_date_project, 'yyyy-MM-dd'),
    end_date_project: formData.start_date_project ? format(formData.start_date_project, 'yyyy-MM-dd') : '2023-12-31',
    address_site: formData.address_site,
  };

  console.log('dispatch', projectData);
  const { data } = await axios.post('http://127.0.0.1:8000/api/v1/user-project/create-project/', projectData);

  const transformedUserData = formData.user.reduce(
    (result, user) => {
      const userId = user.full_name.value;
      result.user.push(userId);
      result.comments[userId] = user.comment;

      if (instructions.specialities !== null) {
        const specialityMatch = instructions.specialities.find((item) => item.title === user.membersRole);
        result.speciality[userId] = specialityMatch ? specialityMatch.id : 9;
      } else {
        result.speciality[userId] = null;
      }

      return result;
    },
    { user: [], comments: {}, speciality: {}, project: data.project.id }
  );

  console.log(data);
  console.log(transformedUserData);

  const response = await axios.put(
    `http://127.0.0.1:8000/api/v1/user-project/command-update/${data.command.id}/`,
    transformedUserData
  );

  const combinedData = { project: data, team: response.data };

  return combinedData;
});

const fetchTeam = createAsyncThunk(ActionType.GET_TEAM, async (title: string, thunkAPI) => {
  await thunkAPI.dispatch(getInstructions());
  const { instructions } = (await thunkAPI.getState()) as RootState;
  console.log(instructions);
  const { data } = await axios.get<{ team_lead: string; project: ProjectDataParams; user: userDataParams[] }>(
    `http://127.0.0.1:8000/api/v1/user-project/command-project-detail/${title}/`
  );

  console.log(data);

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
          ? instructions.specialities?.find((item) => item.id === user.speciality) || ''
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

  console.log('current team', currentTeam);
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
  speciality: number | null;
  comment: string | null;
}

export { fetchProjects, deleteProject, addProject, fetchTeam };
