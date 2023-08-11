import { SelectRoleIconType, SelectItem, SelectIconWrapper, SelectRoleIcon, SelectText } from '../SelectField.style';

export const MemberRole = ({ type, title }: { type: SelectRoleIconType; title: string }) => {
  return (
    <SelectItem>
      <SelectIconWrapper>
        <SelectRoleIcon type={type} />
      </SelectIconWrapper>
      <SelectText>{title}</SelectText>
    </SelectItem>
  );
};
