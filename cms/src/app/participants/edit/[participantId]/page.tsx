'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { usePathname } from 'next/navigation';

import { ParticipantsForm } from '~/src/components/ParticipantsForm/ParticipantsForm';
import { Title } from '~/src/components/Title/Title';
import { getParticipant, updateParticipant } from '~/src/slices/participants';

export default function EditParticipant() {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const [defaultValues, setDefaultValues] = useState(null);
  const { isLoading, error } = useSelector((state: any) => state.participants);
  const { specialities, participation_types } = useSelector((state: any) => state.instructions);
  const userId = pathname.split('/')[pathname.split('/').length - 1];
  useEffect(() => {
    const fetchData = async () => {
      const result = await dispatch(getParticipant(userId));
      if (result.meta.requestStatus === 'fulfilled') {
        setDefaultValues(result.payload);
      }
    };
    fetchData();
  }, []);
  // console.log('Default: ', defaultValues);
  const handleSubmit = (formData: object) => {
    if (specialities && participation_types) {
      dispatch(updateParticipant({ formData, userId, instructions: { specialities, participation_types } }));
    }
  };
  return (
    <div>
      {isLoading ? (
        <Title title="Loading" />
      ) : error ? (
        <Title title="Error" />
      ) : (
        defaultValues && (
          <ParticipantsForm formVariant="edit" defaultValues={defaultValues} handleSubmit={handleSubmit} />
        )
      )}
    </div>
  );
}
