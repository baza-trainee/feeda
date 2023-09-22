'use client';
import { Dispatch, SetStateAction, useState } from 'react';
import { Control, FieldValues, SubmitHandler, UseFormHandleSubmit, UseFormReset } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { addProject } from '~/src/redux/projects/actions';
import { AppDispatch, RootState } from '~/src/redux/store/store';

import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { PopUp } from '../PopUp/PopUp';
import {
  getComplixity,
  getProjectStatus,
  getProjectType,
  projectDifficulty,
  projectStatus,
  projectType,
} from '../SelectField/lists';
import { SelectField } from '../SelectField/SelectField';
import { FormControllers, FormWrapper, InputsWrapper } from './ProjectForm.styles';

export interface ProjectFormProps {
  control: Control;
  clearErrors: (name?: string | string[]) => void;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  isDisabled: boolean;
  setDisabled: Dispatch<SetStateAction<boolean>>;
  resetForm: UseFormReset<FieldValues>;
}

export const ProjectForm = ({
  control,
  clearErrors,
  handleSubmit,
  isDisabled,
  setDisabled,
  resetForm,
}: ProjectFormProps) => {
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
          name="title"
          label="Назва"
          placeholder="Назва"
          maxLength={30}
          required={true}
          rules={{ required: 'це поле є обовязковим' }}
          disabled={isDisabled}
        />
        <Input
          control={control}
          name="comment"
          label="Коментар"
          placeholder="Введіть текст"
          maxLength={50}
          disabled={isDisabled}
        />
        <SelectField
          control={control}
          clearErrors={clearErrors}
          name="complexity"
          placeholder="Введіть текст"
          options={projectDifficulty}
          title="Складність"
          rules={{ required: 'це поле є обовязковим' }}
          valueGetter={(value) => getComplixity(value)}
          isDisabled={isDisabled}
        />
        <SelectField
          control={control}
          clearErrors={clearErrors}
          name="project_status"
          placeholder="Введіть текст"
          options={projectStatus}
          title="Стан проекту"
          rules={{ required: 'це поле є обовязковим' }}
          valueGetter={(value) => getProjectStatus(value)}
          isDisabled={isDisabled}
        />
        <SelectField
          control={control}
          clearErrors={clearErrors}
          name="type_project"
          placeholder="Введіть текст"
          options={projectType}
          title="Тип проекту"
          rules={{ required: 'це поле є обовязковим' }}
          valueGetter={(value) => getProjectType(value)}
          isDisabled={isDisabled}
        />
        <Input control={control} name="start_date_project" label="Старт проету" type="date" disabled={isDisabled} />
        <Input control={control} name="end_date_project" label="Завершення проету" type="date" disabled={isDisabled} />
        <Input
          control={control}
          name="address_site"
          label="Адреса сайту"
          placeholder="https://example.con"
          maxLength={30}
          disabled={isDisabled}
        />
      </InputsWrapper>
      <FormControllers>
        {isDisabled ? (
          <Button
            variant="primary"
            title="Редагувати"
            func={(e) => {
              e.preventDefault();
              setDisabled(false);
            }}
          />
        ) : (
          <Button variant="primary" title="Зберегти зміни" btnType="submit" func={handleSubmit(onFormSubmit)} />
        )}
        <Button
          variant="text"
          title="Скасувати"
          btnType="submit"
          func={(e) => {
            e.preventDefault();
            console.log('reset');
            resetForm();
          }}
        />
      </FormControllers>
      {loading === 'success' && isModalOpen && <PopUp type="success" closeModalFunc={() => setModalOpen(false)} />}
      {loading === 'rejected' && isModalOpen && <PopUp type="rejected" closeModalFunc={() => setModalOpen(false)} />}
    </FormWrapper>
  );
};
