'use client';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PopUp } from '~/src/components/PopUp/PopUp';
import { Title } from '~/src/components/Title/Title';

import { ParticipantsForm } from '../../../components/ParticipantsForm/ParticipantsForm';
import { createParticipant } from '../../../slices/participants/operations';

export default function CreateParticipant() {
  const dispatch = useDispatch();
  const { specialities, participation_types } = useSelector((state: any) => state.instructions);
  const { error, isLoading } = useSelector((state: any) => state.participants);
  const [showPopUp, setShowPopUp] = useState(false);

  const handleSubmit = (formData: object) => {
    dispatch(createParticipant({ formData, instructions: { specialities, participation_types } })).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        setShowPopUp(true);
      }
    });
  };

  const closeModalFunc = () => {
    setShowPopUp(false);
  };

  return isLoading ? (
    <Title title="Loading" />
  ) : error ? (
    <Title title={typeof error == 'string' ? error : 'Error'} />
  ) : (
    <div>
      <ParticipantsForm handleSubmit={handleSubmit} formVariant="create" />
      {showPopUp && <PopUp type="success" mobileWidth="256px" closeModalFunc={closeModalFunc} />}
    </div>
  );
}
