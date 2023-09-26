import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { ActionType } from './common';
import { ProjectData } from './projects.slice';

const fetchProjects = createAsyncThunk(ActionType.GET_ALL, async () => {
  const { data } = await axios.get<{ results: ProjectData[] }>('http://localhost:8000/api/v1/project/');

  return data;
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

export { fetchProjects, deleteProject };
