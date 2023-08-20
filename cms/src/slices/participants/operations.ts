import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000/user-project/';
axios.defaults.headers.Authorization = 'Token 2f2691a9e0585570f09d180ef9b10b922f96106b';

import { manageFormFields } from '~/src/helpers/manageParticipantFormValues';

import { IdNameType } from '../instructions';

export const fetchParticipants = createAsyncThunk('participants/fetchParticipants', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get<ParticipantData[]>('participants-list/');
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const createParticipant = createAsyncThunk(
  'participants/createParticipant',
  async ({ formData, instructions }, { rejectWithValue }) => {
    try {
      manageFormFields(formData, instructions);
      // console.log('Create: ', formData);
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

// export const deleteParticipant = createAsyncThunk('participants/deleteParticipant', async (id: string) => {

export const sendEmail = createAsyncThunk('participants/sendEmail', async (userId: string, { rejectWithValue }) => {
  try {
    const { data } = await axios.get<any>(`send/${userId}/`);
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

interface UpdateParticipantTypes {
  formData: object;
  userId: string;
  instructions: {
    specialities: IdNameType[];
    participation_types: IdNameType[];
  };
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
  conditions_participation: boolean;
  processing_personal_data: boolean;
  speciality: object;
  project: string[];
  type_participant: 'Безкоштовний' | 'Платний' | 'Буткамп';
}
