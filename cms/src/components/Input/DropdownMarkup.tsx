import { IconSprite } from '../IconSprite/IconSprite';
import { DropdownItem, NonStdInputIconWrapper } from './Input.styles';

type DropdownMarkupProps = {
  type: string;
  onInputFunc: (e: string) => void;
  dropdownList: string[];
  value: string;
};

export function DropdownMarkup({ type, onInputFunc, dropdownList, value }: DropdownMarkupProps) {
  let result;
  if (type === 'complexity') {
    result = [1, 2, 3, 4, 5].map((item, idx) => {
      return (
        <DropdownItem key={idx} onClick={() => onInputFunc(item.toString())}>
          {[0, 1, 2, 3, 4].map((item) => (
            <NonStdInputIconWrapper key={item}>
              <IconSprite icon={item <= idx ? 'complexityActive' : 'complexityInactive'} />
            </NonStdInputIconWrapper>
          ))}
        </DropdownItem>
      );
    });
  } else {
    result = dropdownList
      ?.filter((item) => item.toLowerCase().includes(value.toLowerCase()))
      .map((item) => {
        return (
          <DropdownItem key={item} onClick={() => onInputFunc(item)}>
            {item}
          </DropdownItem>
        );
      });
  }
  return result;
}
