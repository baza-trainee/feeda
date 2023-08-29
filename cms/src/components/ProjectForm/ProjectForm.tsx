'use client';
import { Control, UseFormHandleSubmit, UseFormGetValues, FieldValues, SubmitHandler } from 'react-hook-form';
import { Input } from '../Input/Input';
import { SelectField } from '../SelectField/SelectField';
import { FormControllers, FormWrapper, InputsWrapper } from './ProjectForm.styles';
import { projectDifficulty, projectStatus, projectType } from '../SelectField/lists';
import { Button } from '../Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '~/src/redux/store/store';
import { addProject } from '~/src/redux/projects/actions';
import { PopUp } from '../PopUp/PopUp';
import { useState } from 'react';

export interface ProjectFormProps {
  control: Control;
  clearErrors: (name?: string | string[]) => void;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
}

export const ProjectForm = ({ control, clearErrors, handleSubmit }: ProjectFormProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { loading } = useSelector((state: RootState) => state.projects);
  const dispatch = useDispatch<AppDispatch>();

  const onFormSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log('fromForm', data);
    setModalOpen(true);
    dispatch(addProject(data));
  };

  return (
    <FormWrapper>
      <InputsWrapper>
        <Input
          control={control}
          clearErrors={clearErrors}
          name="title"
          label="Назва"
          placeholder="Назва"
          maxLength={30}
          required={true}
          rules={{ required: 'це поле є обовязковим' }}
        />
        <Input
          control={control}
          clearErrors={clearErrors}
          name="comment"
          label="Коментар"
          placeholder="Введіть текст"
          maxLength={50}
        />
        <SelectField
          control={control}
          clearErrors={clearErrors}
          name="complixity"
          placeholder="Введіть текст"
          options={projectDifficulty}
          title="Складність"
          rules={{ required: 'це поле є обовязковим' }}
        />
        <SelectField
          control={control}
          clearErrors={clearErrors}
          name="project_status"
          placeholder="Введіть текст"
          options={projectStatus}
          title="Стан проекту"
          rules={{ required: 'це поле є обовязковим' }}
        />
        <SelectField
          control={control}
          clearErrors={clearErrors}
          name="type_project"
          placeholder="Введіть текст"
          options={projectType}
          title="Тип проекту"
          rules={{ required: 'це поле є обовязковим' }}
        />
        <Input
          control={control}
          clearErrors={clearErrors}
          name="start_date_project"
          label="Старт проету"
          rules={{ required: 'це поле є обовязковим' }}
          type="date"
        />
        <Input
          control={control}
          clearErrors={clearErrors}
          name="end_date_project"
          label="Завершення проету"
          type="date"
        />
        <Input
          control={control}
          clearErrors={clearErrors}
          name="address_site"
          label="Адреса сайту"
          placeholder="https://example.con"
          maxLength={30}
        />
      </InputsWrapper>
      <FormControllers>
        <Button variant="primary" title="Зберегти зміни" btnType="submit" func={handleSubmit(onFormSubmit)} />
        <Button variant="text" title="Скасувати" func={() => console.log('CANCEL form fetsh')} />
      </FormControllers>
      {loading === 'success' && isModalOpen && <PopUp type="success" closeModalFunc={() => setModalOpen(false)} />}
      {loading === 'rejected' && isModalOpen && <PopUp type="rejected" closeModalFunc={() => setModalOpen(false)} />}
    </FormWrapper>
  );
};
