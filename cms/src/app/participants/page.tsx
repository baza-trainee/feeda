'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Link from 'next/link';

import { IconSprite } from '~/src/components/IconSprite/IconSprite';

import { CardsContent } from '../../components/CardsContent/CardsContent';
import { fetchParticipants } from '../../slices/participants/index';
import { Wrapper } from './page.styles';

export default function AddParticipantPage() {
  const dispatch = useDispatch();
  const participantsList = useSelector((state: any) => state.participants.list);
  useEffect(() => {
    dispatch(fetchParticipants());
  }, []);
  return (
    <Wrapper>
      <Link href="participants/create">
        <IconSprite icon="plus" />
        Додати учасника
      </Link>
      <CardsContent type="participants" data={participantsList} />
    </Wrapper>
  );
}
