import { SelectIconWrapper, SelectItem, SelectStateIcon, SelectStateIconType, SelectText } from '../SelectField.style';

export const ProjectState = ({ type, title }: { type: SelectStateIconType; title: string }) => {
  return (
    <SelectItem>
      <SelectIconWrapper>
        <SelectStateIcon type={type} />
      </SelectIconWrapper>
      <SelectText>{title}</SelectText>
    </SelectItem>
  );
};
