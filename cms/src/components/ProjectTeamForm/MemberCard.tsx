import { DelBtnWrapper, MemberCardWrapper } from './ProjectTeamForm.styles';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { AsyncField, SelectField } from '../SelectField/SelectField';
import { getRole, membersRole } from '../SelectField/lists';
import { Control } from 'react-hook-form';
import { searchParticipants } from '~/src/redux/participants/operations';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '~/src/redux/store/store';

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
    console.log(list);

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
