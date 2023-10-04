import { Control, FieldValues, UseFormTrigger } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { fetchParticipants } from '~/src/redux/participants/operations';
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
  isDisabled: boolean;
  trigger?: UseFormTrigger<FieldValues>;
}

export const MemberCard: React.FC<MemberCardProps> = ({
  control,
  clearErrors,
  index,
  onDelete,
  name,
  isDisabled,
  trigger,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { list } = useSelector((state: RootState) => state.participants);

  const loadingOptions = async (inputValue: string) => {
    await dispatch(fetchParticipants(inputValue));
    console.log(list);

    const options = list.map((item) => ({
      id: item.id,
      value: item.id,
      label: `${item.first_name} ${item.last_name}`,
      last_name: item.last_name,
      first_name: item.first_name,
    }));
    return options || [];
  };

  return (
    <MemberCardWrapper>
      <AsyncField
        control={control}
        placeholder="Виберіть учасника"
        clearErrors={clearErrors}
        name={`${name}..${index}.full_name`}
        options={loadingOptions}
        title="Ім'я"
        rules={{ required: 'це поле обовязкове' }}
        isDisabled={isDisabled}
        trigger={trigger}
      />
      <SelectField
        control={control}
        clearErrors={clearErrors}
        options={membersRole}
        placeholder="Оберіть роль"
        name={`${name}..${index}.role`}
        title="Роль"
        rules={{ required: 'це поле є обовязковим' }}
        valueGetter={(value) => getRole(value)}
        isDisabled={isDisabled}
        trigger={trigger}
      />
      <Input
        control={control}
        placeholder="Введіть текст"
        name={`${name}..${index}.comment`}
        label="Коментар"
        maxLength={50}
        disabled={isDisabled}
      />
      <DelBtnWrapper>
        <Button
          variant="icon"
          icon="delete"
          func={() => {
            onDelete(index);
          }}
          isDisabled={isDisabled}
        />
      </DelBtnWrapper>
    </MemberCardWrapper>
  );
};
