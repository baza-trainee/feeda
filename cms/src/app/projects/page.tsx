'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Link from 'next/link';

import { Button } from '../../components/Button/Button';
import { CardsContent } from '../../components/CardsContent/CardsContent';
import { fetchProjects } from '../../redux/projects/actions';
import { AppDispatch, RootState } from '../../redux/store/store';
import { AddButtonWrapper, ProjectsContainer } from './ProjectsPage.styles';

export default function ProjectsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { projects, loading } = useSelector((state: RootState) => state.projects);

  console.log(projects);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  return (
    <ProjectsContainer>
      <AddButtonWrapper>
        <Link href={'./projects/add'}>
          <Button variant="text" icon="plus" title="Додати проект" />
        </Link>
      </AddButtonWrapper>
      {loading === 'loading' && <div>Loading ...</div>}
      {loading === 'success' && <CardsContent type="projects" data={projects} />}
      {loading === 'rejected' && <div>Щось рішло не так... Спробуйте пізніше</div>}
    </ProjectsContainer>
  );
}
