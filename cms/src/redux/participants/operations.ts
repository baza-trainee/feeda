import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

axios.defaults.baseURL = 'http://localhost:8000/';

import { FieldValues } from 'react-hook-form';

import { manageFormFields } from '../../helpers/manageParticipantFormValues';

export const fetchParticipants = createAsyncThunk('participants/fetchParticipants', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get<ParticipantsResponseTypes>('api/v1/participant/');
    return data;
  } catch (err) {
    if (err instanceof AxiosError) {
      return rejectWithValue(err.response?.data);
    } else return rejectWithValue(true);
  }
});

export const createParticipant = createAsyncThunk(
  'participants/createParticipant',
  async ({ formData }: { formData: FieldValues }, { rejectWithValue }) => {
    try {
      const requestData = manageFormFields(formData);
      console.log('Create: ', requestData);
      const { data } = await axios.post<ParticipantData>('api/v1/participant/', requestData);
      return data;
    } catch (err) {
      if (err instanceof AxiosError) {
        return rejectWithValue(err.response?.data);
      } else return rejectWithValue(true);
    }
  }
);

export const getParticipant = createAsyncThunk(
  'participants/getParticipant',
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<ParticipantData>(`api/v1/participant/${id}/`);
      return data;
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 404) {
          return rejectWithValue('Помилка, статус 404. Можливо, учасника не знайдено');
        } else if (err.response?.status === 500) {
          return rejectWithValue('Помилка сервера, статус 500');
        } else return rejectWithValue(err.response?.data);
      } else return rejectWithValue(true);
    }
  }
);

export const updateParticipant = createAsyncThunk(
  'participants/updateParticipant',
  async ({ formData, userId }: UpdateParticipantTypes, { rejectWithValue }) => {
    try {
      console.log('Update: ', formData);
      const requestData = manageFormFields(formData);
      const { data } = await axios.put<ParticipantData>(`api/v1/participant/${userId}/`, requestData);
      return data;
    } catch (err) {
      if (err instanceof AxiosError) {
        return rejectWithValue(err.response?.data);
      } else return rejectWithValue(true);
    }
  }
);

export const deleteParticipant = createAsyncThunk(
  'participants/deleteParticipant',
  async (userId: string, { dispatch, rejectWithValue }) => {
    try {
      await axios.delete<ParticipantData>(`api/v1/participant/${userId}/`);
      await dispatch(fetchParticipants());
      return;
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 404) {
          return rejectWithValue('Помилка, статус 404');
        } else if (err.response?.status === 500) {
          return rejectWithValue('Помилка сервера, статус 500');
        } else return rejectWithValue(err.response?.data);
      } else return rejectWithValue(true);
    }
  }
);

export const sendEmail = createAsyncThunk('participants/sendEmail', async (userId: string, { rejectWithValue }) => {
  try {
    const { data } = await axios.get<{ message: string }>(`user-project/send/${userId}/`);
    return data;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response?.status === 404) {
        return rejectWithValue('Помилка, статус 404');
      } else if (err.response?.status === 500) {
        return rejectWithValue('Помилка сервера, статус 500');
      } else return rejectWithValue(err.response?.data);
    } else return rejectWithValue(true);
  }
});

export const searchProjects = createAsyncThunk(
  'participants/searchProjects',
  async (search: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<{ results: { id: number; label: string; title: string }[] }>('api/v1/project', {
        params: { search },
      });
      for (const item of data.results) {
        item.label = item.title;
      }
      console.log(data.results);
      return data.results;
    } catch (err) {
      if (err instanceof AxiosError) {
        return rejectWithValue(err.response?.data);
      } else return rejectWithValue(true);
    }
  }
);

export const searchParticipants = createAsyncThunk(
  'participants/searchParticipants',
  async (search: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<ParticipantsResponseTypes>('api/v1/participant/', {
        params: { query: search },
      });
      return data;
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 404) {
          return rejectWithValue('Помилка, статус 404');
        } else if (err.response?.status === 500) {
          return rejectWithValue('Помилка сервера, статус 500');
        } else return rejectWithValue(err.response?.data);
      } else return rejectWithValue(true);
    }
  }
);

interface UpdateParticipantTypes {
  formData: FieldValues;
  userId: string;
}

interface ParticipantsResponseTypes {
  count: number;
  next: null;
  previous: null;
  results: ParticipantData[];
}

export interface ParticipantData {
  id: string;
  first_name: string;
  last_name: string;
  comment: string;
  phone_number: string;
  email: string;
  account_discord: string;
  account_linkedin: string;
  city: string;
  experience: boolean;
  stack: string;
  speciality: { id: number; title: string };
  project: { id: number; label: string; title: string; projectId: number }[];
  project_count: number;
  type_participant: { id: number; title: 'Безкоштовний' | 'Платний' | 'Буткамп' };
}
