import { Control, UseFormHandleSubmit, UseFormGetValues, FieldValues } from 'react-hook-form';
import { Input } from '../Input/Input';
import { OptionType, SelectField } from '../SelectField/SelectField';
import { FormControllers, FormWrapper, InputsWrapper } from './ProjectForm.styles';
import {
  getDiffValue,
  projectDifficulty,
  getProjectTypeValue,
  getProjectValue,
  projectStatus,
  projectType,
} from '../SelectField/lists';
import { Button } from '../Button/Button';
import { FormData } from '~/src/app/projects/[projectId]/page';

export interface ProjectFormProps {
  values: FormData;
  setValues: () => void;
  control: Control;
  clearErrors: (name?: string | string[]) => void;
  getValues: UseFormGetValues<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
}

export const ProjectForm = ({ values, setValues, control, clearErrors, getValues, handleSubmit }: ProjectFormProps) => {
  const onFormSubmit = () => {
    console.log(getValues());
    setValues();
  };

  //console.log(values);

  const stateData = values.state;
  const complixityData = values.complixity;
  const typeData = values.type;

  const statePlaceholder = getProjectValue(stateData.value)?.label || 'Оберіть стан';
  const complixityPlaceholder = getDiffValue(complixityData.value)?.label || 'Оберіть стан';
  const typePlaceholder = getProjectTypeValue(typeData.value)?.label || 'Оберіть стан';

  return (
    <FormWrapper onSubmit={handleSubmit(onFormSubmit)}>
      <InputsWrapper>
        <Input
          control={control}
          clearErrors={clearErrors}
          name="name"
          label="Назва"
          placeholder="Назва"
          defaultValue={values?.name}
        />
        <Input
          control={control}
          clearErrors={clearErrors}
          name="comment"
          label="Коментар"
          placeholder="Введіть текст"
          defaultValue={values?.comment}
        />
        <SelectField
          control={control}
          clearErrors={clearErrors}
          name="complixity"
          valueGetter={(value) => getDiffValue(value)}
          placeholder={complixityPlaceholder}
          options={projectDifficulty}
          title="Складність"
          defaultValue={{ value: complixityData.value, label: complixityPlaceholder || '' }}
        />
        <SelectField
          control={control}
          clearErrors={clearErrors}
          name="state"
          valueGetter={(value = stateData.value) => getProjectValue(value)}
          placeholder={statePlaceholder}
          options={projectStatus}
          title="Стан проекту"
          defaultValue={{ value: stateData.value, label: statePlaceholder }}
        />
        <SelectField
          control={control}
          clearErrors={clearErrors}
          name="type"
          valueGetter={(value = typeData.value) => getProjectTypeValue(value)}
          placeholder={typePlaceholder}
          options={projectType}
          title="Тип проекту"
          defaultValue={{ value: typeData.value, label: typePlaceholder }}
        />
        <Input
          control={control}
          clearErrors={clearErrors}
          name="start_date"
          label="Старт проету"
          defaultValue={values?.start_date}
        />
        <Input
          control={control}
          clearErrors={clearErrors}
          name="end_date"
          label="Завершення проету"
          defaultValue={values?.end_date}
        />
        <Input
          control={control}
          clearErrors={clearErrors}
          name="url"
          label="Адреса сайту"
          placeholder="https://example.con"
          defaultValue={values?.url}
        />
      </InputsWrapper>
      <FormControllers>
        <Button variant="primary" title="Зберегти зміни" func={handleSubmit(onFormSubmit)} />
        <Button variant="text" title="Скасувати" func={() => console.log('CANCEL form fetsh')} />
      </FormControllers>
    </FormWrapper>
  );
};
