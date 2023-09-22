import { FieldValues } from 'react-hook-form';

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { RootState } from '../store/store';
import { ActionType } from './common';
import { ProjectServerData, manageProjectSererData } from '~/src/helpers/manageProjectServerData';
import { manageProjectFormData } from '~/src/helpers/manageProjectFormData';
import { manageTeamFromData } from '~/src/helpers/manageTeamFormData';

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
  const { instructions } = (await thunkAPI.getState()) as RootState;

  const projectData = manageProjectFormData(instructions, formData);

  console.log('dispatch', projectData);

  const { data } = await axios.post('http://127.0.0.1:8000/api/v1/user-project/create-project/', projectData);

  console.log(data);

  const transformedUserData = manageTeamFromData(instructions, formData, data.id); // fix Back - dont return id

  console.log(transformedUserData);

  const response = await axios.put(
    `http://127.0.0.1:8000/api/v1/user-project/command-update/${data.command.id}/`, // fix Back - dont return command id
    transformedUserData
  );

  const combinedData = { project: data, team: response.data };

  return combinedData;
});

const fetchTeam = createAsyncThunk(ActionType.GET_TEAM, async (title: string) => {
  const config = {
    headers: { Authorization: `Bearer 709ee6c843dae3cff689dc6a70bb2d502eed3009` },
  };

  const { data } = await axios.get<ProjectServerData>(`/project/${title}/`, config);
  console.log(data);

  const currentTeam = manageProjectSererData(data);

  return currentTeam;
});

export { fetchProjects, deleteProject, addProject, fetchTeam };
