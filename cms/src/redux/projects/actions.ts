import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { manageProjectFormData, ProjectFormData } from '~/src/helpers/manageProjectFormData';
import { manageProjectSererData, ProjectServerData } from '~/src/helpers/manageProjectServerData';

import { RootState } from '../store/store';
import { ActionType } from './common';
import { ProjectData } from './projects.slice';

const fetchProjects = createAsyncThunk(
  ActionType.GET_ALL,
  async (searchParams?: { [key: string]: string | string[] | undefined }) => {
    const { data } = await axios.get<ProjectData>('/project/', { params: searchParams || undefined });

    return data.results;
  }
);

const deleteProject = createAsyncThunk(ActionType.DELETE_PROJECT, async (slug: string) => {
  try {
    await axios.delete(`project/${slug}`);
    return;
  } catch (err) {
    console.log('Delete error: ', err);
  }
});

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
