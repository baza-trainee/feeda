'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { usePathname } from 'next/navigation';

import { ParticipantsForm } from '~/src/components/ParticipantsForm/ParticipantsForm';
import { Title } from '~/src/components/Title/Title';
import { getParticipant, updateParticipant } from '~/src/slices/participants';

export default function EditParticipant() {
  const pathname = usePathname();
  const { isLoading, error } = useSelector((state: any) => state.participants);
  const [defaultValues, setDefaultValues] = useState(null);
  const userId = pathname.split('/')[pathname.split('/').length - 1];
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      const result = await dispatch(getParticipant(userId)); //!!!! ПЕРЕРОБИТИ
      if (result.meta.requestStatus === 'fulfilled') {
        setDefaultValues(result.payload);
      }
    };
    fetchData();
  }, []);
  const handleSubmit = (formData: object) => {
    dispatch(updateParticipant({ formData, userId }));
  };
  return (
    <div>
      {isLoading ? (
        <Title title="Loading" />
      ) : error ? (
        <Title title="Error" />
      ) : (
        <ParticipantsForm formVariant="edit" defaultValues={defaultValues} handleSubmit={handleSubmit} />
      )}
    </div>
  );
}
