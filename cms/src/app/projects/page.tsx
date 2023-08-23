'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Link from 'next/link';

import { Button } from '~/src/components/Button/Button';
import { CardsContent } from '~/src/components/CardsContent/CardsContent';
import { deleteProject, fetchProjects } from '~/src/redux/slices/projects/actions';
import { AppDispatch, RootState } from '~/src/redux/store/store';

import { AddButtonWrapper, ProjectsContainer } from './ProjectsPage.styles';

export default function ProjectsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { projects, loading } = useSelector((state: RootState) => state.projects);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const handleDelete = (title: string | number | null) => {
    dispatch(deleteProject(title)).then(() => {
      dispatch(fetchProjects());
    });
  };

  return (
    <ProjectsContainer>
      <AddButtonWrapper>
        <Link href={'./projects/add'}>
          <Button variant="text" icon="plus" title="Додати проект" />
        </Link>
      </AddButtonWrapper>
      {loading === 'loading' && <div>Loading ...</div>}
      {loading === 'success' && <CardsContent type="projects" data={projects} onDelete={handleDelete} />}
      {loading === 'rejected' && <div>Щось рішло не так... Спробуйте пізніше</div>}
    </ProjectsContainer>
  );
}
