import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { ActionType } from './common';
import { ProjectData } from './projects.slice';

const fetchProjects = createAsyncThunk(ActionType.GET_ALL, async () => {
  const { data } = await axios.get<ProjectData[]>('http://localhost:8000/user-project/projects/', {
    headers: {
      Authorization: 'Token 87495e7e2a03ca367358472a0e81c954fd90c59c', //implement auth,
    },
  });

  return data;
});

const deleteProject = createAsyncThunk(ActionType.DELETE_PROJECT, async (title: string | number | null) => {
  const { data } = await axios.delete(`http://localhost:8000/user-project/project/${title}`, {
    headers: {
      Authorization: 'Token 87495e7e2a03ca367358472a0e81c954fd90c59c', //implement auth,
    },
  });

  return data;
});

export { fetchProjects, deleteProject };
