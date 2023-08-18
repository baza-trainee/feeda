import { DelBtnWrapper, MemberCardWrapper } from './ProjectTeamForm.styles';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { SelectField } from '../SelectField/SelectField';
import { getRoleValue, membersRole } from '../SelectField/lists';
import { Control } from 'react-hook-form';

export interface MemberCardProps {
  control: Control;
  clearErrors: (name?: string | string[]) => void;
}

export const MemberCard: React.FC<MemberCardProps> = ({ control, clearErrors }) => {
  return (
    <MemberCardWrapper>
      <Input
        control={control}
        clearErrors={clearErrors}
        placeholder="Виберыть учасника"
        name="memberName"
        label="Ім'я"
      />
      <SelectField
        control={control}
        clearErrors={clearErrors}
        options={membersRole}
        placeholder={'Роль'}
        name="memberRole"
        title="Роль"
        valueGetter={(value) => getRoleValue(value)}
      />
      <Input
        control={control}
        clearErrors={clearErrors}
        placeholder="Введіть текст"
        name="memberComment"
        label="Коментар"
      />
      <DelBtnWrapper>
        <Button variant="icon" icon="delete" func={() => console.log('deleted')} />
      </DelBtnWrapper>
    </MemberCardWrapper>
  );
};
