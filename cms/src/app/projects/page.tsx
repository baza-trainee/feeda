'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CardsContent } from '~/src/components/CardsContent/CardsContent';
import { AppDispatch, RootState } from '~/src/redux/store/store';
import { fetchProjects, deleteProject } from '~/src/redux/slices/projects/actions';
import { Button } from '~/src/components/Button/Button';
import { ProjectsContainer, AddButtonWrapper } from './ProjectsPage.styles';
import Link from 'next/link';

export default function ProjectsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { projects, loading } = useSelector((state: RootState) => state.projects);

  useEffect(() => {
    dispatch(fetchProjects());
  }, []);

  const handleDelete = (title: string) => {
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
