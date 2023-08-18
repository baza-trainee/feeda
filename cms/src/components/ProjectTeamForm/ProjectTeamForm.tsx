import {
  Control,
  UseFormGetValues,
  FieldValues,
  UseFormHandleSubmit,
  UseFormSetValue,
  UseFormWatch,
  UseFormRegister,
  SubmitHandler,
} from 'react-hook-form';
import { Button } from '../Button/Button';
import { Title } from '../Title/Title';
import { MemberCard } from './MemberCard';
import { FormTitle, FormWrapper, AddBntWrapper, InputsWrapper } from './ProjectTeamForm.styles';

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
  membersRole: { value: string; label: JSX.Element };
  conmment: string;
};

export const ProjectTeamForm: React.FC<TeamFormProps> = ({ control, clearErrors, getValues, handleSubmit }) => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => console.log(data);
  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <FormTitle>
        <Title title="Загальна команда" />
        <AddBntWrapper>
          <Button variant="text" icon="plus" func={() => console.log('member added')} title="Додати учасника" />
        </AddBntWrapper>
      </FormTitle>
      <InputsWrapper>
        <MemberCard control={control} clearErrors={clearErrors} getValues={getValues} handleSubmit={handleSubmit} />
      </InputsWrapper>
      <button type="submit">TEST SUBMIT</button>
    </FormWrapper>
  );
};
