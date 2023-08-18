import { DelBtnWrapper, MemberCardWrapper } from './ProjectTeamForm.styles';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import {
  Control,
  UseFormGetValues,
  FieldValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form';
import { MemberType } from './ProjectTeamForm';

export interface MemberCardProps {
  control: Control;
  clearErrors: (name?: string | string[]) => void;
  getValues: UseFormGetValues<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  onDelete: () => void;
  memberData: MemberType;
}

export const MemberCard: React.FC<MemberCardProps> = ({
  control,
  clearErrors,
  getValues,
  handleSubmit,
  onDelete,
  memberData,
}) => {
  return (
    <MemberCardWrapper>
      <Input control={control} clearErrors={clearErrors} placeholder={memberData.name} name="name" label="Ім'я" />
      <Input
        control={control}
        clearErrors={clearErrors}
        placeholder={memberData.LastName}
        name="lastName"
        label="Прізвище"
      />
      <Input control={control} clearErrors={clearErrors} placeholder="Введіть текст" name="member_1" label="Коментар" />
      <DelBtnWrapper>
        <Button variant="icon" icon="delete" func={onDelete} />
      </DelBtnWrapper>
    </MemberCardWrapper>
  );
};
