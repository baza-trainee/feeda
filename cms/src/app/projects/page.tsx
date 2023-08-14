'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CardsContent } from '~/src/components/CardsContent/CardsContent';
import { AppDispatch, RootState } from '~/src/store/store';
import { fetchProjects } from '~/src/slices/projects';
import { Button } from '~/src/components/Button/Button';
import { ProjectsContainer, AddButtonWrapper } from './ProjectsPage.styles';

export default function ProjectsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { projects, loading } = useSelector((state: RootState) => state.projects);

  useEffect(() => {
    dispatch(fetchProjects());
  }, []);

  return (
    <ProjectsContainer>
      <AddButtonWrapper>
        <Button variant="text" icon="plus" title="Додати проект" />
      </AddButtonWrapper>
      {loading === 'loading' && <div>Loading ...</div>}
      {loading === 'success' && <CardsContent type="projects" data={projects} />}
      {loading === 'rejected' && <div>Щось рішло не так... Спробуйте пізніше</div>}
    </ProjectsContainer>
  );
}
