'use client';

import { FieldValues, useForm } from 'react-hook-form';

import { membersRole, projectDifficulty, projectType } from '../components/SelectField/lists';
import { Input } from './Input/Input';
import { MemberRole } from './SelectField/lists/MemberRole';
import { ProjectDifficulty } from './SelectField/lists/ProjectDifficulty';
import { ProjectType } from './SelectField/lists/ProjectsType';
import { AsyncField, SelectField } from './SelectField/SelectField';

//// Temp Mock Data Should replace with fetch fn
export interface ColourOption {
  readonly value: string;
  readonly label: string;
}

export const colourOptions: readonly ColourOption[] = [
  { value: 'ocean', label: 'Ocean' },
  { value: 'blue', label: 'Blue' },
  { value: 'purple', label: 'Purple' },
  { value: 'red', label: 'Red' },
  { value: 'orange', label: 'Orange' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'green', label: 'Green' },
  { value: 'forest', label: 'Forest' },
  { value: 'slate', label: 'Slate' },
  { value: 'silver', label: 'Silver' },
];

const filterColors = (inputValue: string) => {
  return colourOptions.filter((i) => i.label.toLowerCase().includes(inputValue.toLowerCase()));
};

const promiseOptions = (inputValue: string) =>
  new Promise<ColourOption[]>((resolve) => {
    setTimeout(() => {
      resolve(filterColors(inputValue));
    }, 1000);
  });

/////////

export const TestForm = () => {
  const { control, clearErrors, watch, handleSubmit } = useForm<FieldValues>({
    defaultValues: {
      role: {
        label: <MemberRole type="orange" title="Front" />,
      },

      diff: {
        value: 3,
        label: <ProjectDifficulty type={3} />,
      },
      type: {
        value: 'for free',
        label: <ProjectType title="безкоштовний" />,
      },
      name: 'Max',
      date: new Date(),
    },
  });

  // console.log(watch('role')); TEMP

  const handleSubmitForm = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <form
      style={{ display: 'flex', flexDirection: 'column', gap: '30px', margin: '30px auto', width: '500px' }}
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      <SelectField
        control={control}
        clearErrors={clearErrors}
        options={membersRole}
        name="role"
        title="Role"
        placeholder="Виберіть роль"
        rules={{ required: 'це поле є обовʼязковим' }}
      />
      <SelectField
        control={control}
        clearErrors={clearErrors}
        options={projectDifficulty}
        name="diff"
        title="Dificulty"
        placeholder="Виберіть складність"
        rules={{ required: 'це поле є обовʼязковим' }}
      />
      <SelectField
        control={control}
        clearErrors={clearErrors}
        options={projectType}
        name="type"
        title="Dificulty"
        placeholder="Виберіть складність"
        rules={{ required: 'це поле є обовʼязковим' }}
      />

      <Input
        control={control}
        clearErrors={clearErrors}
        name="name"
        placeholder="Введіть імʼя"
        label="Імʼя"
        rules={{ required: 'це поле є обовʼязковим' }}
        minLength={2}
      />
      <Input
        control={control}
        clearErrors={clearErrors}
        name="date"
        placeholder="Оберіть дату"
        label="Дата"
        rules={{ required: 'це поле є обовʼязковим' }}
        minLength={2}
        type="date"
      />
      <AsyncField
        control={control}
        clearErrors={clearErrors}
        name="async"
        options={promiseOptions}
        placeholder="Оберіть учвсника"
      />
      <button type="submit" style={{ marginTop: '50px' }}>
        SUBMIT
      </button>
    </form>
  );
};
