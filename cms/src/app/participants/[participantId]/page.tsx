'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { usePathname } from 'next/navigation';

import { ParticipantsForm } from '../../../components/ParticipantsForm/ParticipantsForm';
import { Title } from '../../../components/Title/Title';
import { getParticipant } from '../../../redux/participants/operations';
import { AppDispatch, StoreTypes } from '../../../redux/store/store';
import Loader from '../../loading';

export default function ParticipantProfile() {
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error, participant } = useSelector((state: StoreTypes) => state.participants);
  const userId = pathname.split('/')[pathname.split('/').length - 1];

  useEffect(() => {
    if (participant?.id !== userId) {
      dispatch(getParticipant(userId));
    }
    // eslint-disable-next-line
  }, [participant]);

  return error ? (
    <Title title={typeof error == 'string' ? error : 'Error'} />
  ) : (
    participant && (
      <>
        <ParticipantsForm formVariant="view" defaultValues={participant} />
        {isLoading && <Loader />}
      </>
    )
  );
}
