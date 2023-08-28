import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { ActionType } from './common';
import { ProjectData } from './projects.slice';

const fetchProjects = createAsyncThunk(ActionType.GET_ALL, async () => {
  const { data } = await axios.get<ProjectData[]>('http://localhost:8000/user-project/projects/', {
    headers: {
      Authorization: 'Token 6f5075a85b6fdd7db4bf48cb6eec40f9e2d52ec1', //implement auth,
    },
  });

  return data;
});

const deleteProject = createAsyncThunk(
  ActionType.DELETE_PROJECT,
  async (title: string | number | null, { dispatch }) => {
    try {
      await axios.delete(`http://localhost:8000/user-project/project/${title}`, {
        headers: {
          Authorization: 'Token 6f5075a85b6fdd7db4bf48cb6eec40f9e2d52ec1', //implement auth,
        },
      });
      await dispatch(fetchProjects());
      return;
    } catch (err) {
      console.log('Delete error: ', err);
    }
  }
);

export { fetchProjects, deleteProject };
