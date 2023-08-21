'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { usePathname } from 'next/navigation';

import { ParticipantsForm } from '../../../components/ParticipantsForm/ParticipantsForm';
import { Title } from '../../../components/Title/Title';
import { getParticipant } from '../../../slices/participants/operations';
import { StoreTypes } from '../../../store/store';

export default function ParticipantProfile() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [defaultValues, setDefaultValues] = useState(null);
  const { isLoading, error, participant } = useSelector((state: StoreTypes) => state.participants);
  const userId = pathname.split('/')[pathname.split('/').length - 1];

  useEffect(() => {
    if (participant?.id !== userId) {
      dispatch(getParticipant(userId));
    }
    participant && setDefaultValues(participant);
    // eslint-disable-next-line
  }, [participant]);

  return isLoading ? (
    <Title title="Loading" />
  ) : error ? (
    <Title title={typeof error == 'string' ? error : 'Error'} />
  ) : (
    defaultValues && (
      <div>
        <ParticipantsForm formVariant="view" defaultValues={defaultValues} />
      </div>
    )
  );
}
