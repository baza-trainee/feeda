import { Control, FieldValues, UseFormHandleSubmit, SubmitHandler, useFormState } from 'react-hook-form';
import { FormWrapper } from './ProjectTeamForm.styles';

import { TeamFormSection } from './TeamFormSection';

export interface TeamFormProps {
  control: Control;
  clearErrors: (name?: string | string[]) => void;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
}

export type MemberType = {
  name: string;
  membersRole: { value: string; label: JSX.Element };
  comment: string;
};

export const ProjectTeamForm: React.FC<TeamFormProps> = ({ control, clearErrors, handleSubmit }) => {
  return (
    <FormWrapper>
      <TeamFormSection control={control} clearErrors={clearErrors} name="members" title="Загальна команда" />
      <TeamFormSection control={control} clearErrors={clearErrors} name="teamLead" title="Тімлід команди" />
    </FormWrapper>
  );
};
