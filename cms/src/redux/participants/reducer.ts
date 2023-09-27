import { createSlice } from '@reduxjs/toolkit';

import {
  createParticipant,
  deleteParticipant,
  fetchParticipants,
  getParticipant,
  ParticipantData,
  searchProjects,
  sendEmail,
  updateParticipant,
} from './operations';

const initialState: ParticipantsStateTypes = {
  list: [],
  participant: null,
  isLoading: false,
  error: null,
};

export const participantsSlice = createSlice({
  name: 'participants',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchParticipants.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchParticipants.fulfilled, (state, { payload }) => {
      state.list = payload.results;
      state.isLoading = false;
    });
    builder.addCase(fetchParticipants.rejected, (state, { payload }) => {
      if (typeof payload === 'string') state.error = payload;
      else state.error = true;
      state.isLoading = false;
    });

    builder.addCase(createParticipant.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createParticipant.fulfilled, (state, { payload }) => {
      state.participant = { ...payload };
      state.isLoading = false;
    });
    builder.addCase(createParticipant.rejected, (state, { payload }) => {
      if (typeof payload === 'string') state.error = payload;
      else state.error = true;
      state.isLoading = false;
    });

    // - - -

    builder.addCase(getParticipant.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.participant = null;
    });
    builder.addCase(getParticipant.fulfilled, (state, { payload }) => {
      state.participant = payload;
      state.isLoading = false;
    });
    builder.addCase(getParticipant.rejected, (state, { payload }) => {
      if (typeof payload === 'string') state.error = payload;
      else state.error = true;
      state.isLoading = false;
    });

    // - - -

    builder.addCase(updateParticipant.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateParticipant.fulfilled, (state, { payload }) => {
      state.participant = payload;
      state.isLoading = false;
    });
    builder.addCase(updateParticipant.rejected, (state, { payload }) => {
      if (typeof payload === 'string') state.error = payload;
      else state.error = true;
      state.isLoading = false;
    });

    // - - -

    builder.addCase(deleteParticipant.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(deleteParticipant.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(deleteParticipant.rejected, (state, { payload }) => {
      if (typeof payload === 'string') state.error = payload;
      else state.error = true;
      state.isLoading = false;
    });

    // - - -

    builder.addCase(sendEmail.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(sendEmail.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(sendEmail.rejected, (state, { payload }) => {
      if (typeof payload === 'string') state.error = payload;
      else state.error = true;
      state.isLoading = false;
    });

    // - - -

    builder.addCase(searchProjects.pending, (state) => {
      state.error = null;
    });
    builder.addCase(searchProjects.rejected, (state) => {
      state.error = true;
    });
  },
});

export default participantsSlice.reducer;

export interface ParticipantsStateTypes {
  list: ParticipantData[];
  participant: ParticipantData | null;
  isLoading: boolean;
  error: string | null | boolean;
}
