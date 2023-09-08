'use client';

import React, { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '~/src/components/Button/Button';
import { ProjectForm } from '~/src/components/ProjectForm/ProjectForm';
import { MemberType, ProjectTeamForm } from '~/src/components/ProjectTeamForm/ProjectTeamForm';
import { OptionType } from '~/src/components/SelectField/SelectField';
import { fetchTeam } from '~/src/redux/projects/actions';
import { AppDispatch, RootState } from '~/src/redux/store/store';
import { parseISO } from 'date-fns';

import { NavContainer, ProjectContainer } from './styles';

export interface FormData {
  title: string;
  comment: string;
  complixity: OptionType;
  project_status: OptionType;
  type_project: OptionType;
  start_date_project: Date;
  end_date_project: Date | null;
  address_site: string | null;
  user: MemberType[];
  team_lead: MemberType[] | null;
}

type ProjectPageProps = {
  params: {
    projectId: string;
  };
};

export default function ProjectPage({ params }: ProjectPageProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { currentTeam } = useSelector((state: RootState) => state.projects);
  const [currentTab, setCurrentTab] = useState('Опис');
  const [isDisabled, setDisabled] = useState(true);
  const { control, clearErrors, handleSubmit, trigger } = useForm<FieldValues>({
    values: currentTeam,
  });

  console.log(new Date(currentTeam.start_date_project || ''));

  useEffect(() => {
    const projectId = params.projectId;
    if (projectId !== 'add') {
      console.log(projectId);
      dispatch(fetchTeam(projectId));
    } else setDisabled(false);
  }, [dispatch, params.projectId]);

  const handleTabClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const nextTab = e.currentTarget.title;
    const isValid = await trigger();

    if (isValid) {
      setCurrentTab(nextTab);
    } else return;
  };

  const tabs: {
    title: string;
    content: React.ReactNode;
  }[] = [
    {
      title: 'Опис',
      content: (
        <ProjectForm
          control={control}
          clearErrors={clearErrors}
          handleSubmit={handleSubmit}
          isDisabled={isDisabled}
          setDisabled={setDisabled}
        />
      ),
    },
    {
      title: 'Команда',
      content: <ProjectTeamForm control={control} clearErrors={clearErrors} isDisabled={isDisabled} />,
    },
  ];

  return (
    <ProjectContainer>
      <NavContainer>
        <Button
          variant="tab"
          icon="edit"
          title="Опис"
          btnType="button"
          func={handleTabClick}
          isSelected={currentTab === 'Опис'}
        />
        <Button
          variant="tab"
          icon="team"
          title="Команда"
          btnType="button"
          func={handleTabClick}
          isSelected={currentTab === 'Команда'}
        />
      </NavContainer>
      <div>
        {tabs.map(({ content, title }) => (
          <div key={title}>{currentTab === title && content}</div>
        ))}
      </div>
    </ProjectContainer>
  );
}
