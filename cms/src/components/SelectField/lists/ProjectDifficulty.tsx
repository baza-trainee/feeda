import { SelectDifficulty, SelectDifficultyIcon, SelectDifficultyType } from '../SelectField.style';

export const ProjectDifficulty = ({ type }: { type: SelectDifficultyType }) => {
  return (
    <SelectDifficulty>
      {[1, 2, 3, 4, 5].map((item) => (
        <SelectDifficultyIcon key={item} type={type} />
      ))}
    </SelectDifficulty>
  );
};
