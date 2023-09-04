'use client';
import { useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { ParticipantsForm } from '../../../components/ParticipantsForm/ParticipantsForm';
import { PopUp } from '../../../components/PopUp/PopUp';
import { Title } from '../../../components/Title/Title';
import { createParticipant } from '../../../redux/participants/operations';
import { AppDispatch, StoreTypes } from '../../../redux/store/store';
import Loader from '../../loading';

export default function CreateParticipant() {
  const dispatch = useDispatch<AppDispatch>();
  const { specialities, participation_types } = useSelector((state: StoreTypes) => state.instructions);
  const { error, isLoading } = useSelector((state: StoreTypes) => state.participants);
  const [showPopUp, setShowPopUp] = useState(false);

  const handleSubmit = (formData: FieldValues) => {
    if (!specialities || !participation_types) return console.log('Instructions not loaded');
    dispatch(createParticipant({ formData, instructions: { specialities, participation_types } })).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        setShowPopUp(true);
      }
    });
  };

  const closeModalFunc = () => {
    setShowPopUp(false);
  };

  return error ? (
    <Title title={typeof error == 'string' ? error : 'Error'} />
  ) : (
    <>
      <ParticipantsForm submitFunc={handleSubmit} formVariant="create" />
      {showPopUp && <PopUp type="success" mobileWidth="256px" closeModalFunc={closeModalFunc} />}
      {isLoading && <Loader />}
    </>
  );
}
