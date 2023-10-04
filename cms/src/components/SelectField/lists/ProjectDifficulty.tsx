import { SelectDifficulty, SelectDifficultyIcon, SelectDifficultyType } from '../SelectField.style';

export const ProjectDifficulty = ({ type, isCardItem }: { type: SelectDifficultyType; isCardItem?: boolean }) => {
  return (
    <SelectDifficulty isCardItem={isCardItem}>
      {[1, 2, 3, 4, 5].map((item) => (
        <SelectDifficultyIcon key={item} type={type} isCardItem={isCardItem} />
      ))}
    </SelectDifficulty>
  );
};
