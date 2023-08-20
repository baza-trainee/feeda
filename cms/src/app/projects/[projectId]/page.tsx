'use client';

import React, { useState } from 'react';
import { Button } from '~/src/components/Button/Button';
import { ProjectForm } from '~/src/components/ProjectForm/ProjectForm';
import { MemberType, ProjectTeamForm } from '~/src/components/ProjectTeamForm/ProjectTeamForm';
import { NavContainer, ProjectContainer } from './styles';
import { FieldValues, FormState, SubmitHandler, useForm, get } from 'react-hook-form';
import { OptionType } from '~/src/components/SelectField/SelectField';
import { MemberRole, ProjectState, getProjectValue } from '~/src/components/SelectField/lists';

export interface FormData {
  name: string;
  comment: string;
  complixity: OptionType;
  state: OptionType;
  type: OptionType;
  start_date: string;
  end_date: string;
  url: string;
  members: MemberType[];
}

type ProjectPageProps = {
  params: {
    projectId: string;
  };
};

export default function ProjectPage({ params }: ProjectPageProps) {
  const [currentTab, setCurrentTab] = useState('Команда');
  const { control, clearErrors, handleSubmit, trigger } = useForm<any>({
    defaultValues: {
      name: '',
      comment: '',
      complixity: { label: '', value: '' },
      state: getProjectValue('developing'), /// RENDEE ERROR !!!!
      // state: {
      //   value: 'ended',
      //   label: <ProjectState type="orange" title="Завершено" />,
      // },
      type: null,
      start_date: '',
      end_date: '',
      url: '',
      members: [
        {
          name: 'John Smith',
          membersRole: {
            value: 'front',
            label: <MemberRole type="orange" title="Front" />,
          },
          comment: 'Some comments',
        },
        {
          name: 'Bill Gates',
          membersRole: {
            value: 'front',
            label: <MemberRole type="orange" title="Front" />,
          },
          comment: 'Some comments',
        },
      ],
    },
  });
  const projectId = params.projectId;

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

  const onFormSubmit: SubmitHandler<FieldValues> = async (data) => {
    const isValid = await trigger();
    console.log(isValid);
    console.log(data);
  };

  return (
    <ProjectContainer onSubmit={handleSubmit(onFormSubmit)}>
      <NavContainer>
        <Button variant="primary" icon="edit" title="Опис" btnType="button" func={handleTabClick} />
        <Button variant="text" icon="team" title="Команда" btnType="button" func={handleTabClick} />
        <button type="submit">TEST SUBMIT</button>
      </NavContainer>
      <div>
        {tabs.map(({ content, title }) => (
          <div key={title}>{currentTab === title && content}</div>
        ))}
      </div>
    </ProjectContainer>
  );
}
