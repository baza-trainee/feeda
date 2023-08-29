import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { format } from 'date-fns';

import { ActionType } from './common';
import { FormData } from '../../app/projects/[projectId]/page';
import { getComplixity, getProjectStatus, getProjectType, getRole } from '~/src/components/SelectField/lists';

const AuthToken = '624e3e488cdc0f0c0f57a197c05068b4b5c2cfd5';

const fetchProjects = createAsyncThunk(ActionType.GET_ALL, async () => {
  const { data } = await axios.get('http://localhost:8000/user-project/projects/', {
    headers: {
      Authorization: `Token ${AuthToken}`, //implement auth,
    },
  });
  console.log(data);
  return data.results; /// TEMP PAGINATION
});

const deleteProject = createAsyncThunk(ActionType.DELETE_PROJECT, async (title: string | number | null) => {
  const { data } = await axios.delete(`http://localhost:8000/user-project/project/${title}`, {
    headers: {
      Authorization: `Token ${AuthToken}`, //implement auth,
    },
  });

  return data;
});

const addProject = createAsyncThunk(ActionType.ADD_PROJECT, async (formData: FormData) => {
  const projectData: ProjectDataParams = {
    title: formData.title,
    comment: formData.comment,
    type_project: Number(formData.project_status.value) || 2, /// GET INSTRUCTIONS
    complexity: Number(formData.complixity.value) || 2, /// GET INSTRUCTIONS
    project_status: Number(formData.project_status.value) || 1, ///  /// GET INSTRUCTIONS
    start_date_project: format(formData.start_date_project, 'yyyy-MM-dd'),
    end_date_project: formData.start_date_project ? format(formData.start_date_project, 'yyyy-MM-dd') : '2023-12-31',
    address_site: formData.address_site,
  };

  console.log('dispatch', projectData);
  const { data } = await axios.post(`http://localhost:8000/user-project/create-project/`, projectData, {
    headers: {
      Authorization: `Token ${AuthToken}`, //implement auth,
    },
  });

  const teamData: { team_lead: string; user: string[]; project: string } = {
    team_lead: 'f7d31f25-36d2-4ab9-98ed-1aa8aa5e29c6',
    user: ['f7d31f25-36d2-4ab9-98ed-1aa8aa5e29c6', 'e81be77f-ec88-4e94-9ab5-236ac428d15b'],
    project: data.project.id.toString(),
  };

  const response = await axios.put(`http://localhost:8000/user-project/command-update/${data.command.id}/`, teamData, {
    headers: {
      Authorization: `Token ${AuthToken}`, //implement auth,
    },
  });

  const combinedData = { project: data, team: response.data };

  return combinedData;
});

const fetchTeam = createAsyncThunk(ActionType.GET_TEAM, async (title: string) => {
  const { data } = await axios.get<{ team_lead: string; project: ProjectDataParams; user: userDataParams[] }>(
    `http://localhost:8000/user-project/command-project-detail/${title}/`,
    {
      headers: {
        Authorization: `Token ${AuthToken}`, //implement auth,
      },
    }
  );
  console.log(data);
  const { project, user, team_lead } = data;

  const currentTeam: FormData = {
    title: project.title,
    comment: project.comment,
    complixity: getComplixity(project.complexity),
    project_status: getProjectStatus('developing'),
    type_project: getProjectType('paid'),
    start_date_project: new Date(project.start_date_project),
    end_date_project: project.end_date_project ? new Date(project.end_date_project) : null,
    address_site: project.address_site || null,
    user: user.map((user) => ({
      id: user.id,
      first_name: user.first_name,
      membersRole: getRole('front'),
    })),
    team_lead: null,
  };

  console.log(currentTeam);

  return currentTeam; /// TEMP PAGINATION
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
}

export { fetchProjects, deleteProject, addProject, fetchTeam };
