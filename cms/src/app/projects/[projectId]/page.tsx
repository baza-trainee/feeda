'use client';

import React, { useEffect, useState } from 'react';
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
  const [formValues, setFormValues] = useState<FormData>({
    name: '',
    comment: '',
    complixity: { value: '', label: '' },
    state: { value: '', label: '' },
    type: { value: '', label: '' },
    start_date: '',
    end_date: '',
    url: '',
  });
  const { control, clearErrors, getValues, handleSubmit, setValue, watch, register } = useForm();
  const projectId = params.projectId;

  /// TEMP
  useEffect(() => {
    setFormValues({
      name: '',
      comment: '',
      complixity: { value: '', label: '' },
      state: { value: 'developing', label: '' },
      type: { value: '', label: '' },
      start_date: '',
      end_date: '',
      url: '',
    });
  }, []);

  const handleSetValues = () => {
    const data = getValues();
    const updatedValues = { ...formValues, ...data };
    setFormValues(updatedValues);
  };

  const handleTabClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleSetValues();
    setCurrentTab(e.currentTarget.title);
  };

  const tabs: {
    title: string;
    content: React.ReactNode;
  }[] = [
    {
      title: 'Опис',
      content: (
        <ProjectForm
          setValues={handleSetValues}
          values={formValues}
          control={control}
          clearErrors={clearErrors}
          getValues={getValues}
          handleSubmit={handleSubmit}
        />
      ),
    },
    {
      title: 'Команда',
      content: (
        <ProjectTeamForm
          control={control}
          clearErrors={clearErrors}
          getValues={getValues}
          handleSubmit={handleSubmit}
          setValue={setValue}
          watch={watch}
          register={register}
        />
      ),
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
