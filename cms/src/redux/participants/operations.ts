import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

axios.defaults.baseURL = 'http://localhost:8000/user-project/';
axios.defaults.headers.Authorization = 'Token 6f5075a85b6fdd7db4bf48cb6eec40f9e2d52ec1';

import { FormDataTypes, InstructionsTypes, manageFormFields } from '../../helpers/manageParticipantFormValues';
import { IdNameType } from '../instructions';

export const fetchParticipants = createAsyncThunk('participants/fetchParticipants', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get<ParticipantsResponseTypes>('participants-list/');
    return data;
  } catch (err) {
    if (err instanceof AxiosError) {
      return rejectWithValue(err.response?.data);
    } else return rejectWithValue(true);
  }
});

export const createParticipant = createAsyncThunk(
  'participants/createParticipant',
  async (
    { formData, instructions }: { formData: FormDataTypes; instructions: InstructionsTypes },
    { rejectWithValue }
  ) => {
    try {
      console.log('formData: ', formData);
      // manageFormFields(formData, instructions);
      // console.log('Create: ', formData);
      const { data } = await axios.post<ParticipantData>('add-participant/', formData);
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
      const { data } = await axios.get<ParticipantData>(`get-participant/${id}/`);
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
  async ({ formData, userId, instructions }: UpdateParticipantTypes, { rejectWithValue }) => {
    try {
      manageFormFields(formData, instructions);
      console.log('Update: ', formData);
      const { data } = await axios.put<ParticipantData>(`participant-detail/${userId}/`, formData);
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
      await axios.delete<ParticipantData>(`participant-detail/${userId}/`);
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
    const { data } = await axios.get<{ message: string }>(`send/${userId}/`);
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
      const { data } = await axios.get<{ id: number; title: string }[]>('search-projects', {
        params: { query: search },
      });
      return data;
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
      const { data } = await axios.get<ParticipantData[]>('search-user', {
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
  formData: FormDataTypes;
  userId: string;
  instructions: {
    specialities: IdNameType[];
    participation_types: IdNameType[];
  };
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
  processing_personal_data: boolean;
  speciality: { id: number; title: string };
  project: string[];
  project_count: number;
  type_participant: { id: number; title: 'Безкоштовний' | 'Платний' | 'Буткамп' };
}
