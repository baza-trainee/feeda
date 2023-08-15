'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { usePathname } from 'next/navigation';

import { ParticipantsForm } from '~/src/components/ParticipantsForm/ParticipantsForm';
import { Title } from '~/src/components/Title/Title';
import { getParticipant } from '~/src/slices/participants';

export default function ParticipantProfile() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [defaultValues, setDefaultValues] = useState(null);
  const { isLoading, error, participant } = useSelector((state: any) => state.participants);
  const userId = pathname.split('/')[pathname.split('/').length - 1];

  useEffect(() => {
    if (participant?.id !== userId) {
      dispatch(getParticipant(userId));
    }
    participant && setDefaultValues(participant);
  }, [participant]);

  return (
    <div>
      {isLoading ? (
        <Title title="Loading" />
      ) : error ? (
        <Title title="Error" />
      ) : (
        <ParticipantsForm formVariant="view" defaultValues={defaultValues} />
      )}
    </div>
  );
}
