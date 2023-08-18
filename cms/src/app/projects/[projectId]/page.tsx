'use client';

import React, { useState } from 'react';
import { Button } from '~/src/components/Button/Button';
import { ProjectForm } from '~/src/components/ProjectForm/ProjectForm';
import { ProjectTeamForm } from '~/src/components/ProjectTeamForm/ProjectTeamForm';
import { NavContainer, ProjectContainer } from './styles';
import { useForm } from 'react-hook-form';
import { OptionType } from '~/src/components/SelectField/SelectField';

export type FormData = {
  name: string;
  comment: string;
  complixity: OptionType;
  state: OptionType;
  type: OptionType;
  start_date: string;
  end_date: string;
  url: string;
};

type ProjectPageProps = {
  params: {
    projectId: string;
  };
};

export default function ProjectPage({ params }: ProjectPageProps) {
  const [currentTab, setCurrentTab] = useState('Команда');
  const { control, clearErrors, getValues, handleSubmit, setValue, watch, register } = useForm({
    defaultValues: {
      name: 'Hello',
    },
  });
  const projectId = params.projectId;

  const handleTabClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCurrentTab(e.currentTarget.title);
  };

  const tabs: {
    title: string;
    content: React.ReactNode;
  }[] = [
    {
      title: 'Опис',
      content: <ProjectForm control={control} clearErrors={clearErrors} handleSubmit={handleSubmit} />,
    },
    {
      title: 'Команда',
      content: <ProjectTeamForm control={control} clearErrors={clearErrors} handleSubmit={handleSubmit} />,
    },
  ];

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
