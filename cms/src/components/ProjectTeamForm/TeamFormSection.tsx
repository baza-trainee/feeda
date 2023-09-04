import { Control, useFieldArray } from 'react-hook-form';

import { Button } from '../Button/Button';
import { Title } from '../Title/Title';
import { MemberCard } from './MemberCard';
import { AddBntWrapper, FormSection, FormTitle, InputsWrapper } from './ProjectTeamForm.styles';

export interface TeamSectionProps {
  control: Control;
  clearErrors: (name?: string | string[]) => void;
  name: string;
  title: string;
  isDisabled: boolean;
}

export const TeamFormSection: React.FC<TeamSectionProps> = ({ control, clearErrors, name, title, isDisabled }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const addMember = () => {
    append({
      first_name: '',
      membersRole: null,
      comment: '',
      id: '',
    });
  };

  return (
    <FormSection>
      <FormTitle>
        <Title small title={title} />
        <AddBntWrapper>
          <Button variant="text" icon="plus" func={addMember} title="Додати учасника" isDisabled={isDisabled} />
        </AddBntWrapper>
      </FormTitle>
      <InputsWrapper>
        {fields.map((field, index) => (
          <MemberCard
            key={field.id}
            control={control}
            clearErrors={clearErrors}
            index={index}
            onDelete={() => remove(index)}
            name={name}
            isDisabled={isDisabled}
          />
        ))}
      </InputsWrapper>
    </FormSection>
  );
};
