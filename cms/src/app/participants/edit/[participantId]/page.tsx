'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { usePathname } from 'next/navigation';

import { ParticipantsForm } from '~/src/components/ParticipantsForm/ParticipantsForm';
import { PopUp } from '~/src/components/PopUp/PopUp';
import { Title } from '~/src/components/Title/Title';
import { getParticipant, updateParticipant } from '~/src/slices/participants/operations';

export default function EditParticipant() {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const [showPopUp, setShowPopUp] = useState(false);
  const { isLoading, error, participant } = useSelector((state: any) => state.participants);
  const { specialities, participation_types } = useSelector((state: any) => state.instructions);
  const userId = pathname.split('/')[pathname.split('/').length - 1];

  useEffect(() => {
    if (participant?.id !== userId) {
      dispatch(getParticipant(userId));
    }
  }, []);

  const handleSubmit = (formData: object) => {
    if (!specialities || !participation_types) return console.log('Instructions not loaded');
    dispatch(updateParticipant({ formData, userId, instructions: { specialities, participation_types } })).then(
      (res) => {
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
