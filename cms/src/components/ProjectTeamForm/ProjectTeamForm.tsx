import {
  Control,
  UseFormGetValues,
  FieldValues,
  UseFormHandleSubmit,
  UseFormSetValue,
  UseFormWatch,
  UseFormRegister,
} from 'react-hook-form';
import { Button } from '../Button/Button';
import { Title } from '../Title/Title';
import { MemberCard } from './MemberCard';
import { FormTitle, FormWrapper, AddBntWrapper, InputsWrapper } from './ProjectTeamForm.styles';
import { Fragment, useEffect } from 'react';

export interface TeamFormProps {
  control: Control;
  clearErrors: (name?: string | string[]) => void;
  getValues: UseFormGetValues<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  register: UseFormRegister<FieldValues>;
}

export type MemberType = {
  name: string;
  LastName: string;
};

const initialMembers = [
  { name: 'Bill', LastName: 'Wolf' },
  { name: 'John', LastName: 'Smith' },
];

export const ProjectTeamForm: React.FC<TeamFormProps> = ({
  control,
  clearErrors,
  getValues,
  handleSubmit,
  setValue,
  watch,
  register,
}) => {
  const members: MemberType[] = watch('members', []);

  useEffect(() => {
    initialMembers.forEach((member, index) => {
      setValue(`members[${index}].name`, member.name);
      setValue(`members[${index}].LastName`, member.LastName);
    });
  }, [setValue]);

  const addMember = () => {
    const newMember = { name: '', LastName: '' };
    setValue('members', [...members, newMember]);
  };

  const removeMember = (index: number) => {
    setValue(
      'members',
      members.filter((_: object, i: number) => i !== index)
    );
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const formData = getValues();
    const groupedData: { [key: string]: MemberType } = {};

    formData.members.forEach((member: MemberType, index: number) => {
      const memberKey = `member${index + 1}`;
      groupedData[memberKey] = { name: member.name, LastName: member.LastName };
    });

    console.log(groupedData);
  };

  return (
    <FormWrapper onSubmit={onSubmit}>
      <FormTitle>
        <Title title="Загальна команда" />
        <AddBntWrapper>
          <Button variant="text" icon="plus" func={addMember} title="Додати учасника" />
        </AddBntWrapper>
      </FormTitle>
      <InputsWrapper>
        {members.map((member, index) => (
          <Fragment key={index}>
            <MemberCard
              control={control}
              clearErrors={clearErrors}
              getValues={getValues}
              handleSubmit={handleSubmit}
              onDelete={() => removeMember(index)}
              memberData={member}
            />
          </Fragment>
        ))}
      </InputsWrapper>
      <button type="submit">TEST SUBMIT</button>
    </FormWrapper>
  );
};
