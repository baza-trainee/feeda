'use client';

import { useState } from 'react';
import { Button } from '~/src/components/Button/Button';
import { ProjectForm } from '~/src/components/ProjectForm/ProjectForm';
import { ProjectTeamForm } from '~/src/components/ProjectTeamForm/ProjectTeamForm';
import { NavContainer, ProjectContainer } from './styles';

export default function ProjectPage({ params }: { params: { projectId: string } }) {
  const [currentTab, setCurrentTab] = useState('Опис');
  const projectId = params.projectId;

  const tabs = [
    { title: 'Опис', content: <ProjectForm /> },
    { title: 'Команда', content: <ProjectTeamForm /> },
  ];

  const handleTabClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCurrentTab(e.currentTarget.title);
  };

  return (
    <ProjectContainer>
      <NavContainer>
        <Button variant="primary" icon="edit" title="Опис" btnType="button" func={handleTabClick} />
        <Button variant="text" icon="team" title="Команда" btnType="button" func={handleTabClick} />
      </NavContainer>
      <div>
        {tabs.map(({ content, title }) => (
          <div key={title}>{currentTab === title && content}</div>
        ))}
      </div>
    </ProjectContainer>
  );
}
