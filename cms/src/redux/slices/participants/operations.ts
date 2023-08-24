import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000/user-project/';
axios.defaults.headers.Authorization = 'Token b054b2b2d6d5fdb05ea5759787b684ef03670ffb';

import { FormDataTypes, InstructionsTypes, manageFormFields } from '../../../helpers/manageParticipantFormValues';
import { IdNameType } from '../instructions';

export const fetchParticipants = createAsyncThunk('participants/fetchParticipants', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get<ParticipantsResponseTypes>('participants-list/');
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const createParticipant = createAsyncThunk(
  'participants/createParticipant',
  async (
    { formData, instructions }: { formData: FormDataTypes; instructions: InstructionsTypes },
    { rejectWithValue }
  ) => {
    try {
      manageFormFields(formData, instructions);
      console.log('Create: ', formData);
      const { data } = await axios.post<ParticipantData>('add-participant/', formData);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
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
      if (err.response.status === 404) {
        return rejectWithValue('Помилка, статус 404. Можливо, учасника не знайдено');
      } else if (err.response.status === 500) {
        return rejectWithValue('Помилка сервера, статус 500');
      } else return rejectWithValue(err.response.data);
    }
  }
);

export const updateParticipant = createAsyncThunk(
  'participants/updateParticipant',
  async ({ formData, userId, instructions }: UpdateParticipantTypes, { rejectWithValue }) => {
    try {
      manageFormFields(formData, instructions);
      const { data } = await axios.put<ParticipantData>(`participant-detail/${userId}/`, formData);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteParticipant = createAsyncThunk(
  'participants/deleteParticipant',
  async (userId: string, { rejectWithValue }) => {
    try {
      await axios.delete<ParticipantData>(`participant-detail/${userId}/`);
      return userId;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const sendEmail = createAsyncThunk('participants/sendEmail', async (userId: string, { rejectWithValue }) => {
  try {
    const { data } = await axios.get<{ message: string }>(`send/${userId}/`);
    return data;
  } catch (err) {
    if (err.response.status === 404) {
      return rejectWithValue('Помилка, статус 404');
    } else if (err.response.status === 500) {
      return rejectWithValue('Помилка сервера, статус 500');
    } else return rejectWithValue(err.response.data);
  }
});

export const searchProjects = createAsyncThunk(
  'participants/searchProjects',
  async (search: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<{ id: number; title: string }>('search-projects', { params: { query: search } });
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
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
      if (err.response.status === 404) {
        return rejectWithValue('Помилка, статус 404');
      } else if (err.response.status === 500) {
        return rejectWithValue('Помилка сервера, статус 500');
      } else return rejectWithValue(err.response.data);
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
  speciality: object;
  project: string[];
  type_participant: { id: number; title: 'Безкоштовний' | 'Платний' | 'Буткамп' };
}
