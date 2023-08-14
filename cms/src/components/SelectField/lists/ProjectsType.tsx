import { SelectText,SelectTextItem } from '../SelectField.style';

export const ProjectType = ({ title }: { title: string }) => {
  return (
    <SelectTextItem>
      <SelectText>{title}</SelectText>
    </SelectTextItem>
  );
};
