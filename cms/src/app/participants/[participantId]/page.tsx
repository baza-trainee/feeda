'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { usePathname } from 'next/navigation';

import { ParticipantsForm } from '../../../components/ParticipantsForm/ParticipantsForm';
import { Title } from '../../../components/Title/Title';
import { ParticipantData } from '../../../redux/participants/operations';
import { getParticipant } from '../../../redux/participants/operations';
import { AppDispatch, StoreTypes } from '../../../redux/store/store';
import Loader from '../../loading';

export default function ParticipantProfile() {
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const [defaultValues, setDefaultValues] = useState<null | ParticipantData>(null);
  const { isLoading, error, participant } = useSelector((state: StoreTypes) => state.participants);
  const userId = pathname.split('/')[pathname.split('/').length - 1];

  useEffect(() => {
    if (participant?.id !== userId) {
      dispatch(getParticipant(userId));
    }
    participant && setDefaultValues(participant);
    // eslint-disable-next-line
  }, [participant]);

  return error ? (
    <Title title={typeof error == 'string' ? error : 'Error'} />
  ) : (
    defaultValues && (
      <>
        <ParticipantsForm formVariant="view" defaultValues={defaultValues} />
        {isLoading && <Loader />}
      </>
    )
  );
}
