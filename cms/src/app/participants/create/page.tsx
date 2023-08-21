'use client';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ParticipantsForm } from '../../../components/ParticipantsForm/ParticipantsForm';
import { PopUp } from '../../../components/PopUp/PopUp';
import { Title } from '../../../components/Title/Title';
import { createParticipant } from '../../../slices/participants/operations';
import { StoreTypes } from '../../../store/store';

export default function CreateParticipant() {
  const dispatch = useDispatch();
  const { specialities, participation_types } = useSelector((state: StoreTypes) => state.instructions);
  const { error, isLoading } = useSelector((state: StoreTypes) => state.participants);
  const [showPopUp, setShowPopUp] = useState(false);

  const handleSubmit = (formData: object) => {
    dispatch(createParticipant({ formData, instructions: { specialities, participation_types } })).then(
      (res: { meta: { requestStatus: string } }) => {
        if (res.meta.requestStatus === 'fulfilled') {
          setShowPopUp(true);
        }
      }
    );
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
