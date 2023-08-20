import { DelBtnWrapper, MemberCardWrapper } from './ProjectTeamForm.styles';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { SelectField } from '../SelectField/SelectField';
import { getRoleValue, membersRole } from '../SelectField/lists';
import { Control } from 'react-hook-form';
import { useEffect } from 'react';

export interface MemberCardProps {
  control: Control;
  clearErrors: (name?: string | string[]) => void;
  index: number;
  onDelete: (index: number) => void;
  name: string;
}

export const MemberCard: React.FC<MemberCardProps> = ({ control, clearErrors, index, onDelete, name }) => {
  return (
    <MemberCardWrapper>
      <Input
        control={control}
        clearErrors={clearErrors}
        placeholder="Виберыть учасника"
        name={`${name}.${index}.name`}
        label="Ім'я"
      />
      <SelectField
        control={control}
        clearErrors={clearErrors}
        options={membersRole}
        placeholder={'Роль'}
        name={`${name}..${index}.membersRole`}
        title="Роль"
        valueGetter={(value) => getRoleValue(value)}
        rules={{ required: 'це поле є обовязковим' }}
      />
      <Input
        control={control}
        clearErrors={clearErrors}
        placeholder="Введіть текст"
        name={`${name}..${index}.comment`}
        label="Коментар"
      />
      <DelBtnWrapper>
        <Button
          variant="icon"
          icon="delete"
          func={() => {
            console.log('delete');
            onDelete(index);
            console.log('delete');
          }}
        />
      </DelBtnWrapper>
    </MemberCardWrapper>
  );
};
