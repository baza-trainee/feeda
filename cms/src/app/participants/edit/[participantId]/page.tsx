'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { usePathname } from 'next/navigation';

import { ParticipantsForm } from '../../../../components/ParticipantsForm/ParticipantsForm';
import { PopUp } from '../../../../components/PopUp/PopUp';
import { Title } from '../../../../components/Title/Title';
import { FormDataTypes } from '../../../../helpers/manageParticipantFormValues';
import { getParticipant, updateParticipant } from '../../../../redux/participants/operations';
import { AppDispatch, StoreTypes } from '../../../../redux/store/store';
import Loader from '../../../loading';

export default function EditParticipant() {
  const dispatch = useDispatch<AppDispatch>();
  const pathname = usePathname();
  const [showPopUp, setShowPopUp] = useState(false);
  const { isLoading, error, participant } = useSelector((state: StoreTypes) => state.participants);
  const userId = pathname.split('/')[pathname.split('/').length - 1];

  useEffect(() => {
    if (participant?.id !== userId) {
      dispatch(getParticipant(userId));
    }
    // eslint-disable-next-line
  }, []);

  const handleSubmit = (formData: FormDataTypes) => {
    dispatch(updateParticipant({ formData, userId })).then((res: { meta: { requestStatus: string } }) => {
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
      {participant && <ParticipantsForm formVariant="edit" formData={participant} submitFunc={handleSubmit} />}
      {showPopUp && <PopUp type="success" mobileWidth="256px" closeModalFunc={closeModalFunc} />}
      {isLoading && <Loader />}
    </>
  );
}
