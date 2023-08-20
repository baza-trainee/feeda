'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Link from 'next/link';

import { IconSprite } from '~/src/components/IconSprite/IconSprite';
import { Title } from '~/src/components/Title/Title';

import { CardsContent } from '../../components/CardsContent/CardsContent';
import { fetchParticipants } from '../../slices/participants/operations';
import { Wrapper } from './page.styles';

export default function ParticipantsPage() {
  const dispatch = useDispatch();
  const { list, isLoading, error } = useSelector((state: any) => state.participants);
  useEffect(() => {
    dispatch(fetchParticipants());
  }, []);
  return isLoading ? (
    <Title title="Loading" />
  ) : error ? (
    <Title title={typeof error == 'string' ? error : 'Error'} />
  ) : (
    <Wrapper>
      <Link href="participants/create">
        <IconSprite icon="plus" />
        Додати учасника
      </Link>
      <CardsContent type="participants" data={list} />
    </Wrapper>
  );
}
