import { FieldValues } from 'react-hook-form';

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { manageFormFields } from '../../helpers/manageParticipantFormValues';

axios.defaults.baseURL = 'http://localhost:8000/api/v1/';

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
  role: string;
  type: { id: number; title: 'Безкоштовний' | 'Платний' | 'Буткамп' };
}

interface UpdateParticipantTypes {
  formData: FieldValues;
  userId: string;
}

const createAxiosErrorRejection = (err: AxiosError, customMessage?: string) => {
  if (err.response?.status === 404) {
    return customMessage || 'Помилка, статус 404. Можливо, учасника не знайдено';
  } else if (err.response?.status === 500) {
    return customMessage || 'Помилка сервера, статус 500';
  } else {
    return customMessage || err.response?.data || true;
  }
};

export const fetchParticipants = createAsyncThunk<ParticipantsResponseTypes, string | undefined>(
  'participants/fetchParticipants',
  async (search: string | undefined, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<ParticipantsResponseTypes>('/participant', {
        params: { search },
      });
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(createAxiosErrorRejection(error));
      }
      throw error;
    }
  }
);

export const createParticipant = createAsyncThunk<ParticipantData, FieldValues>(
  'participants/createParticipant',
  async (formData, { rejectWithValue }) => {
    try {
      const requestData = manageFormFields(formData);
      console.log('Create: ', requestData);
      const { data } = await axios.post<ParticipantData>('/participant/', requestData);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(createAxiosErrorRejection(error));
      }
      throw error;
    }
  }
);

export const getParticipant = createAsyncThunk<ParticipantData, string>(
  'participants/getParticipant',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<ParticipantData>(`/participant/${id}/`);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(createAxiosErrorRejection(error, 'Помилка, статус 404. Можливо, учасника не знайдено'));
      }
      throw error;
    }
  }
);

export const updateParticipant = createAsyncThunk<ParticipantData, UpdateParticipantTypes>(
  'participants/updateParticipant',
  async ({ formData, userId }, { rejectWithValue }) => {
    try {
      const requestData = manageFormFields(formData);
      console.log('Update: ', formData);
      const { data } = await axios.put<ParticipantData>(`/participant/${userId}/`, requestData);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(createAxiosErrorRejection(error));
      }
      throw error;
    }
  }
);

export const deleteParticipant = createAsyncThunk<void, string>(
  'participants/deleteParticipant',
  async (userId: string, { dispatch, rejectWithValue }) => {
    try {
      await axios.delete<ParticipantData>(`/participant/${userId}/`);
      await dispatch(fetchParticipants());
      return;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(createAxiosErrorRejection(error, 'Помилка, статус 404'));
      }
      throw error;
    }
  }
);

export const sendEmail = createAsyncThunk<string, string>(
  'participants/sendEmail',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/user-project/send/${userId}/`);

      if (response.status === 200) {
        return 'Email sent successfully';
      } else {
        return rejectWithValue('Something went wrong while sending email');
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue('Server error, status 500');
      }
      throw error;
    }
  }
);

export const searchProjects = createAsyncThunk<{ id: number; label: string; title: string }[], string>(
  'participants/searchProjects',
  async (search, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<{ results: { id: number; label: string; title: string }[] }>('/project', {
        params: { search },
      });
      const results = data.results.map((item) => ({ ...item, label: item.title }));
      console.log(results);
      return results;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(createAxiosErrorRejection(error));
      }
      throw error;
    }
  }
);

// export const searchParticipants = createAsyncThunk(
//   'participants/searchParticipants',
//   async (search: string, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.get<ParticipantsResponseTypes>('api/v1/participant/', {
//         params: { search },
//       });
//       return data;
//     } catch (err) {
//       if (err instanceof AxiosError) {
//         if (err.response?.status === 404) {
//           return rejectWithValue('Помилка, статус 404');
//         } else if (err.response?.status === 500) {
//           return rejectWithValue('Помилка сервера, статус 500');
//         } else return rejectWithValue(err.response?.data);
//       } else return rejectWithValue(true);
//     }
//   }
// );
