'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Link from 'next/link';

import { CardsContent } from '../../components/CardsContent/CardsContent';
import { IconSprite } from '../../components/IconSprite/IconSprite';
import { Title } from '../../components/Title/Title';
import { fetchParticipants } from '../../slices/participants/operations';
import { StoreTypes } from '../../store/store';
import { Wrapper } from './page.styles';

export default function ParticipantsPage() {
  const dispatch = useDispatch();
  const { list, isLoading, error } = useSelector((state: StoreTypes) => state.participants);
  useEffect(() => {
    dispatch(fetchParticipants());
    // eslint-disable-next-line
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
