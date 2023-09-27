import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ActionType } from './common';
import { ProjectServerData, manageProjectSererData } from '~/src/helpers/manageProjectServerData';
import { ProjectFormData, manageProjectFormData } from '~/src/helpers/manageProjectFormData';
import { RootState } from '../store/store';
axios.defaults.headers.Authorization = 'Bearer 709ee6c843dae3cff689dc6a70bb2d502eed3009'; // ????

const fetchProjects = createAsyncThunk(ActionType.GET_ALL, async () => {
  const { data } = await axios.get('http://127.0.0.1:8000/api/v1/user-project/projects/');
  return data.results; /// TEMP PAGINATION
});

const deleteProject = createAsyncThunk(
  ActionType.DELETE_PROJECT,
  async (title: string | number | null, { dispatch }) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/user-project/project/${title}`);
      await dispatch(fetchProjects());
      return;
    } catch (err) {
      console.log('Delete error: ', err);
    }
  }
);

const addProject = createAsyncThunk(ActionType.ADD_PROJECT, async (formData: ProjectFormData) => {
  const projectData = manageProjectFormData(formData);

  console.log('dispatch', projectData);

  const { data } = await axios.post('/project/', projectData);

  return data;
});

const editProject = createAsyncThunk(ActionType.EDIT_PROJECT, async (formData: ProjectFormData, { getState }) => {
  const state = getState() as RootState;
  const slug = state.projects.currentTeam.slug;
  const projectData = manageProjectFormData(formData);

  console.log('dispatch', projectData);

  const { data } = await axios.put(`/project/${slug}/`, projectData);

  return data;
});

const fetchTeam = createAsyncThunk(ActionType.GET_TEAM, async (title: string) => {
  const { data } = await axios.get<ProjectServerData>(`/project/${title}/`);
  console.log(data);

  const currentTeam = manageProjectSererData(data);

  return currentTeam;
});

export { fetchProjects, deleteProject, addProject, editProject, fetchTeam };
