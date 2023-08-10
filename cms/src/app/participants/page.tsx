'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CardsContent } from '../../components/CardsContent/CardsContent';
import { fetchParticipants } from '../../slices/participants/index';

export default function AddParticipantPage() {
  const dispatch = useDispatch();
  const participantsList = useSelector((state: any) => state.participants.list);
  useEffect(() => {
    dispatch(fetchParticipants());
  }, []);
  return (
    <div>
      <CardsContent type="participants" data={participantsList} />
    </div>
  );
}
