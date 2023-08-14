'use client';
import { useDispatch } from 'react-redux';

import { ParticipantsForm } from '../../../components/ParticipantsForm/ParticipantsForm';
import { createParticipant } from '../../../slices/participants';

export default function CreateParticipant() {
  const dispatch = useDispatch();

  const handleSubmit = (formData: object) => {
    console.log('submit');
    formData.experience = formData.experience.value === 'Так' ? true : false;
    formData.speciality = formData.speciality.value;
    // formData.type_participant = formData.type_participant.value;
    formData.project = [];
    for (const key in formData) {
      if (key.includes('project_')) {
        formData[key]?.value && formData.project.push(formData[key].value);
        delete formData[key];
      }
    }
    formData.phone_number = 997518482;
    dispatch(createParticipant(formData));
  };

  return (
    <div>
      <ParticipantsForm handleSubmit={handleSubmit} formVariant="create" />
    </div>
  );
}
