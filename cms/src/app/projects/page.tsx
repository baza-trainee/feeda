'use client';

import { useEffect } from 'react';

import Link from 'next/link';

import { useAppDispatch, useAppSelector } from '~/src/redux/hooks';

import { Button } from '../../components/Button/Button';
import { CardsContent } from '../../components/CardsContent/CardsContent';
import { fetchProjects } from '../../redux/projects/actions';
import { StoreTypes } from '../../redux/store/store';
import Loading from '../loading';
import { AddButtonWrapper, ProjectsContainer } from './ProjectsPage.styles';

export default function ProjectsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const dispatch = useAppDispatch();
  const { projects, loading } = useAppSelector((state: StoreTypes) => state.projects);
  const { isLoggedIn } = useAppSelector((state: StoreTypes) => state.auth);

  useEffect(() => {
    isLoggedIn && dispatch(fetchProjects(searchParams));
  }, [dispatch, isLoggedIn, searchParams]);

  if (!isLoggedIn) return false;

  return (
    <ProjectsContainer>
      <AddButtonWrapper>
        <Link href={'./projects/add'}>
          <Button variant="text" icon="plus" title="Додати проєкт" />
        </Link>
      </AddButtonWrapper>
      {loading === 'loading' && <Loading />}
      {loading === 'success' && Object.keys(projects).length === 0 && Object.keys(searchParams).length === 0 && (
        <p>Додайте перший проєкт</p>
      )}
      {loading === 'success' && Object.keys(projects).length === 0 && Object.keys(searchParams).length > 0 && (
        <p>За Вашим запитом проєкти відсутні</p>
      )}
      {loading === 'success' && <CardsContent type="projects" data={projects} />}
      {loading === 'rejected' && <div>Щось рішло не так... Спробуйте пізніше</div>}
    </ProjectsContainer>
  );
}
