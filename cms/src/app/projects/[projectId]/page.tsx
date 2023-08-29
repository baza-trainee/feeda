'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '~/src/components/Button/Button';
import { ProjectForm } from '~/src/components/ProjectForm/ProjectForm';
import { MemberType, ProjectTeamForm } from '~/src/components/ProjectTeamForm/ProjectTeamForm';
import { NavContainer, ProjectContainer } from './styles';
import { FieldValues, useForm } from 'react-hook-form';
import { OptionType } from '~/src/components/SelectField/SelectField';
import { MemberRole, ProjectState } from '~/src/components/SelectField/lists';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '~/src/redux/store/store';
import { fetchTeam } from '~/src/redux/slices/projects/actions';

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

const tempInitialState = {
  title: '',
  comment: '',
  complixity: null,
  project_status: {
    value: 'ended',
    label: <ProjectState type="orange" title="Завершено" />,
  },
  type_project: null,
  start_date_project: '',
  end_date_project: '',
  address_site: '',
  user: [
    {
      name: 'John Smith',
      membersRole: {
        value: 'front',
        label: <MemberRole type="orange" title="Front" />,
      },
      comment: 'Some comments',
      id: 'f7d31f25-36d2-4ab9-98ed-1aa8aa5e29c6',
    },
    {
      name: 'Bill Gates',
      membersRole: {
        value: 'front',
        label: <MemberRole type="orange" title="Front" />,
      },
      comment: 'Some comments',
      id: 'e81be77f-ec88-4e94-9ab5-236ac428d15b',
    },
  ],
  team_lead: [
    {
      name: 'Bill Gates',
      membersRole: {
        value: 'front',
        label: <MemberRole type="orange" title="Front" />,
      },
      comment: 'Some comments',
      id: 'f7d31f25-36d2-4ab9-98ed-1aa8aa5e29c6',
    },
  ],
};

export default function ProjectPage({ params }: ProjectPageProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { currentTeam } = useSelector((state: RootState) => state.projects);
  const [currentTab, setCurrentTab] = useState('Опис');
  const { control, clearErrors, handleSubmit, trigger, reset } = useForm<FieldValues>({
    defaultValues: currentTeam,
  });

  useEffect(() => {
    const projectId = params.projectId;
    console.log(projectId);
    if (projectId !== 'add') {
      dispatch(fetchTeam(projectId));
    }

    console.log(currentTeam);
  }, []);

  React.useEffect(() => {
    if (currentTeam) {
      console.log('reset');
      reset(currentTeam);
    }
  }, [currentTeam, reset]);

  const handleTabClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const nextTab = e.currentTarget.title;
    const isValid = await trigger();
    console.log(isValid);
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
