import { Control } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { searchParticipants } from '~/src/redux/participants/operations';
import { AppDispatch, RootState } from '~/src/redux/store/store';

import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { getRole, membersRole } from '../SelectField/lists';
import { AsyncField, SelectField } from '../SelectField/SelectField';
import { DelBtnWrapper, MemberCardWrapper } from './ProjectTeamForm.styles';

export interface MemberCardProps {
  control: Control;
  clearErrors: (name?: string | string[]) => void;
  index: number;
  onDelete: (index: number) => void;
  name: string;
}

export const MemberCard: React.FC<MemberCardProps> = ({ control, clearErrors, index, onDelete, name }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { list } = useSelector((state: RootState) => state.participants);

  const loadingOptions = async (inputValue: string) => {
    await dispatch(searchParticipants(inputValue));

    const options = list.map((item) => ({
      value: item.id,
      label: `${item.first_name} ${item.last_name}`,
    }));
    return options || [];
  };

  return (
    <MemberCardWrapper>
      <AsyncField
        control={control}
        placeholder="Виберіть учасника"
        clearErrors={clearErrors}
        name={`${name}.${index}.full_name`}
        options={loadingOptions}
        title="Ім'я"
        rules={{ required: 'це полу обовязкове' }}
      />
      <SelectField
        control={control}
        clearErrors={clearErrors}
        options={membersRole}
        placeholder="Оберіть роль"
        name={`${name}..${index}.membersRole`}
        title="Роль"
        // rules={{ required: 'це поле є обовязковим' }}
        valueGetter={(value) => getRole(value)}
      />
      <Input
        control={control}
        placeholder="Введіть текст"
        name={`${name}..${index}.comment`}
        label="Коментар"
        maxLength={50}
      />
      <DelBtnWrapper>
        <Button
          variant="icon"
          icon="delete"
          func={() => {
            onDelete(index);
          }}
        />
      </DelBtnWrapper>
    </MemberCardWrapper>
  );
};
