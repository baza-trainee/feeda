import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { ActionType } from './common';
import { ProjectData } from './projects.slice';

const fetchProjects = createAsyncThunk(ActionType.GET_ALL, async () => {
  const { data } = await axios.get<ProjectData[]>('http://localhost:8000/user-project/projects/', {
    headers: {
      Authorization: 'Token b054b2b2d6d5fdb05ea5759787b684ef03670ffb', //implement auth,
    },
  });

  return data;
});

const deleteProject = createAsyncThunk(ActionType.DELETE_PROJECT, async (title: string | number | null) => {
  const { data } = await axios.delete(`http://localhost:8000/user-project/project/${title}`, {
    headers: {
      Authorization: 'Token b054b2b2d6d5fdb05ea5759787b684ef03670ffb', //implement auth,
    },
  });

  return data;
});

export { fetchProjects, deleteProject };
