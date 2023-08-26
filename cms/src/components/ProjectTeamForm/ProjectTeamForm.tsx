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
  id: string;
};

export const ProjectTeamForm: React.FC<TeamFormProps> = ({ control, clearErrors, handleSubmit }) => {
  return (
    <FormWrapper>
      <TeamFormSection control={control} clearErrors={clearErrors} name="user" title="Загальна команда" />
      <TeamFormSection control={control} clearErrors={clearErrors} name="team_lead" title="Тімлід команди" />
    </FormWrapper>
  );
};
