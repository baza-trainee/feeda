import { Control } from 'react-hook-form';

import { OptionType } from '../SelectField/SelectField';
import { FormWrapper } from './ProjectTeamForm.styles';
import { TeamFormSection } from './TeamFormSection';

export interface TeamFormProps {
  control: Control;
  clearErrors: (name?: string | string[]) => void;
}

export type MemberType = {
  first_name: string;
  membersRole: OptionType;
  comment?: string;
  id: string;
};

export const ProjectTeamForm: React.FC<TeamFormProps> = ({ control, clearErrors }) => {
  return (
    <FormWrapper>
      <TeamFormSection control={control} clearErrors={clearErrors} name="user" title="Загальна команда" />
      <TeamFormSection control={control} clearErrors={clearErrors} name="team_lead" title="Тімлід команди" />
    </FormWrapper>
  );
};
