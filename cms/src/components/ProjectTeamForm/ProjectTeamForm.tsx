import { Control } from 'react-hook-form';

import { OptionType } from '../SelectField/SelectField';
import { FormWrapper } from './ProjectTeamForm.styles';
import { TeamFormSection } from './TeamFormSection';

export interface TeamFormProps {
  control: Control;
  clearErrors: (name?: string | string[]) => void;
  isDisabled: boolean;
}

export type MemberType = {
  full_name: OptionType;
  membersRole: OptionType;
  comment?: string;
  id: string;
};

export const ProjectTeamForm: React.FC<TeamFormProps> = ({ control, clearErrors, isDisabled }) => {
  return (
    <FormWrapper>
      <TeamFormSection
        control={control}
        clearErrors={clearErrors}
        name="users"
        title="Загальна команда"
        isDisabled={isDisabled}
      />
      <TeamFormSection
        control={control}
        clearErrors={clearErrors}
        name="team_leads"
        title="Тімлід команди"
        isDisabled={isDisabled}
      />
    </FormWrapper>
  );
};
