import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { ActionType } from './common';
import { ProjectData } from './projects.slice';

const fetchProjects = createAsyncThunk(ActionType.GET_ALL, async () => {
  const { data } = await axios.get<ProjectData[]>('http://localhost:8000/user-project/projects/', {
    headers: {
      Authorization: 'Token 7059c31571909b45df3af67c0f8f719d7b793bd0', //implement auth,
    },
  });

  return data;
});

const deleteProject = createAsyncThunk(ActionType.DELETE_PROJECT, async (title: string | number | null) => {
  const { data } = await axios.delete(`http://localhost:8000/user-project/project/${title}`, {
    headers: {
      Authorization: 'Token 7059c31571909b45df3af67c0f8f719d7b793bd0', //implement auth,
    },
  });

  return data;
});

export { fetchProjects, deleteProject };
