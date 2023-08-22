'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import throttle from 'lodash.throttle';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { CardsContent } from '../../components/CardsContent/CardsContent';
import { IconSprite } from '../../components/IconSprite/IconSprite';
import { Title } from '../../components/Title/Title';
import { fetchParticipants, searchParticipants } from '../../slices/participants/operations';
import { StoreTypes } from '../../store/store';
import { Wrapper } from './page.styles';

export default function ParticipantsPage() {
  const dispatch = useDispatch();
  const { list, isLoading, error } = useSelector((state: StoreTypes) => state.participants);
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const throttledSearch = throttle(
    () => {
      if (query.length > 2 || list.length === 0) {
        dispatch(searchParticipants(query));
      }
    },
    400,
    { trailing: true, leading: false }
  );

  useEffect(() => {
    if (query.length === 0) dispatch(fetchParticipants());
    else throttledSearch();
    // eslint-disable-next-line
  }, [query]);

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
      {query.length && !list.length ? (
        <Title title="Нічого не знайдено" />
      ) : (
        <CardsContent type="participants" data={list} />
      )}
    </Wrapper>
  );
}
