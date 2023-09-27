'use client';
import { Dispatch, SetStateAction, useState } from 'react';
import {
  Control,
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormReset,
  UseFormTrigger,
} from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { useRouter } from 'next/navigation';

import { ProjectFormData } from '~/src/helpers/manageProjectFormData';
import { siteAdressRegex } from '~/src/helpers/regexs';
import { addProject, editProject } from '~/src/redux/projects/actions';
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
  path: string;
  trigger: UseFormTrigger<FieldValues>;
}

export const ProjectForm = ({
  control,
  clearErrors,
  handleSubmit,
  isDisabled,
  setDisabled,
  resetForm,
  path,
  trigger,
}: ProjectFormProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { loading } = useSelector((state: RootState) => state.projects);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const onAddProject: SubmitHandler<FieldValues> = async (data) => {
    console.log('fromForm', data);
    setModalOpen(true);
    try {
      const result = await dispatch(addProject(data as ProjectFormData)).unwrap();
      const { slug } = result;
      setTimeout(() => {
        router.push(`/projects/${slug}`);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const onEditProject: SubmitHandler<FieldValues> = async (data) => {
    console.log('fromForm', data);
    setModalOpen(true);
    try {
      const result = await dispatch(editProject(data as ProjectFormData)).unwrap();
      console.log(result);
      setDisabled(true);
    } catch (error) {
      console.log(error);
    }
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
          trigger={trigger}
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
          trigger={trigger}
        />
        <SelectField
          control={control}
          clearErrors={clearErrors}
          name="status"
          placeholder="Введіть текст"
          options={projectStatus}
          title="Стан проекту"
          rules={{ required: 'це поле є обовязковим' }}
          valueGetter={(value) => getProjectStatus(value)}
          isDisabled={isDisabled}
          trigger={trigger}
        />
        <SelectField
          control={control}
          clearErrors={clearErrors}
          name="type"
          placeholder="Введіть текст"
          options={projectType}
          title="Тип проекту"
          rules={{ required: 'це поле є обовязковим' }}
          valueGetter={(value) => getProjectType(value)}
          isDisabled={isDisabled}
          trigger={trigger}
        />
        <Input
          placeholder="Оберіть дату"
          control={control}
          name="start_date_project"
          label="Старт проету"
          type="date"
          disabled={isDisabled}
          rules={{ required: 'це поле є обовязковим' }}
          pattern={siteAdressRegex.source}
          trigger={trigger}
        />
        <Input
          placeholder="Оберіть дату"
          control={control}
          name="end_date_project"
          label="Завершення проету"
          type="date"
          disabled={isDisabled}
        />
        <Input
          control={control}
          name="address_site"
          label="Адреса сайту"
          placeholder="https://example.con"
          maxLength={30}
          disabled={isDisabled}
          pattern={siteAdressRegex.source}
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
          <Button
            variant="primary"
            title="Зберегти зміни"
            btnType="submit"
            func={handleSubmit(path === 'add' ? onAddProject : onEditProject)}
          />
        )}
        <Button
          variant="text"
          title="Скасувати"
          btnType="submit"
          func={(e) => {
            e.preventDefault();
            resetForm();
            setDisabled(true);
          }}
        />
      </FormControllers>
      {loading === 'success' && isModalOpen && <PopUp type="success" closeModalFunc={() => setModalOpen(false)} />}
      {loading === 'rejected' && isModalOpen && <PopUp type="rejected" closeModalFunc={() => setModalOpen(false)} />}
    </FormWrapper>
  );
};
