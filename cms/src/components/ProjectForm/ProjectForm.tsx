import { Control, UseFormHandleSubmit, UseFormGetValues, FieldValues, SubmitHandler } from 'react-hook-form';
import { Input } from '../Input/Input';
import { SelectField } from '../SelectField/SelectField';
import { FormControllers, FormWrapper, InputsWrapper } from './ProjectForm.styles';
import {
  getDiffValue,
  projectDifficulty,
  getProjectTypeValue,
  getProjectValue,
  projectStatus,
  projectType,
  getRoleValue,
  membersRole,
} from '../SelectField/lists';
import { Button } from '../Button/Button';

export interface ProjectFormProps {
  control: Control;
  clearErrors: (name?: string | string[]) => void;
  handleSubmit: UseFormHandleSubmit<FormData>;
}

export const ProjectForm = ({ control, clearErrors, handleSubmit }: ProjectFormProps) => {
  const onFormSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <FormWrapper>
      <InputsWrapper>
        <Input control={control} clearErrors={clearErrors} name="name" label="Назва" placeholder="Назва" />
        <Input
          control={control}
          clearErrors={clearErrors}
          name="comment"
          label="Коментар"
          placeholder="Введіть текст"
          rules={{ required: 'це поле є обовязковим' }}
        />
        <SelectField
          control={control}
          clearErrors={clearErrors}
          name="complixity"
          valueGetter={(value) => getDiffValue(value)}
          placeholder="Введіть текст"
          options={projectDifficulty}
          title="Складність"
        />
        <SelectField
          isSearchable={true}
          control={control}
          clearErrors={clearErrors}
          name="state"
          valueGetter={(value) => getProjectValue(value)}
          placeholder="Введіть текст"
          options={projectStatus}
          title="Стан проекту"
        />
        <SelectField
          control={control}
          clearErrors={clearErrors}
          name="type"
          valueGetter={(value) => getProjectTypeValue(value)}
          placeholder="Введіть текст"
          options={projectType}
          title="Тип проекту"
          rules={{ required: 'це поле є обовязковим' }}
        />
        <Input control={control} clearErrors={clearErrors} name="start_date" label="Старт проету" />
        <Input control={control} clearErrors={clearErrors} name="end_date" label="Завершення проету" />
        <Input
          control={control}
          clearErrors={clearErrors}
          name="url"
          label="Адреса сайту"
          placeholder="https://example.con"
        />
      </InputsWrapper>
      <FormControllers>
        <Button variant="primary" title="Зберегти зміни" btnType="submit" func={() => console.log('submit')} />
        <Button variant="text" title="Скасувати" func={() => console.log('CANCEL form fetsh')} />
      </FormControllers>
    </FormWrapper>
  );
};
