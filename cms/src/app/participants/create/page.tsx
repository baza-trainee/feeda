'use client';
import { useDispatch } from 'react-redux';

import { ParticipantsForm } from '../../../components/ParticipantsForm/ParticipantsForm';
import { createParticipant } from '../../../slices/participants';

export default function CreateParticipant() {
  const dispatch = useDispatch();

  const handleSubmit = (formData: object) => {
    dispatch(createParticipant(formData));
  };

  return (
    <div>
      <ParticipantsForm handleSubmit={handleSubmit} formVariant="create" />
    </div>
  );
}
