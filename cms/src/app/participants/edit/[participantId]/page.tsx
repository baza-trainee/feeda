'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { usePathname } from 'next/navigation';

import { ParticipantsForm } from '../../../../components/ParticipantsForm/ParticipantsForm';
import { PopUp } from '../../../../components/PopUp/PopUp';
import { Title } from '../../../../components/Title/Title';
import { getParticipant, updateParticipant } from '../../../../slices/participants/operations';
import { StoreTypes } from '../../../../store/store';

export default function EditParticipant() {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const [showPopUp, setShowPopUp] = useState(false);
  const { isLoading, error, participant } = useSelector((state: StoreTypes) => state.participants);
  const { specialities, participation_types } = useSelector((state: StoreTypes) => state.instructions);
  const userId = pathname.split('/')[pathname.split('/').length - 1];

  useEffect(() => {
    if (participant?.id !== userId) {
      dispatch(getParticipant(userId));
    }
    // eslint-disable-next-line
  }, []);

  const handleSubmit = (formData: object) => {
    if (!specialities || !participation_types) return console.log('Instructions not loaded');
    dispatch(updateParticipant({ formData, userId, instructions: { specialities, participation_types } })).then(
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
      <ParticipantsForm formVariant="edit" defaultValues={participant} handleSubmit={handleSubmit} />
      {showPopUp && <PopUp type="success" mobileWidth="256px" closeModalFunc={closeModalFunc} />}
    </div>
  );
}