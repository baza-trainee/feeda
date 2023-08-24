import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { ActionType } from './common';
import { ProjectData } from './projects.slice';

const fetchProjects = createAsyncThunk(ActionType.GET_ALL, async () => {
  const { data } = await axios.get<ProjectData[]>('http://localhost:8000/user-project/projects/', {
    headers: {
      Authorization: 'Token fdf0e7ece53196a6d431d0080cc2b8498a54db71', //implement auth,
    },
  });

  return data;
});

const deleteProject = createAsyncThunk(ActionType.DELETE_PROJECT, async (title: string | number | null) => {
  await axios.delete(`http://localhost:8000/user-project/project/${title}`, {
    headers: {
      Authorization: 'Token fdf0e7ece53196a6d431d0080cc2b8498a54db71', //implement auth,
    },
  });

  return title;
});

export { fetchProjects, deleteProject };
