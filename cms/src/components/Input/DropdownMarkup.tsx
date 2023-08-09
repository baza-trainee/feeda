import { IconSprite, IconType } from '../IconSprite/IconSprite';
import { DropdownItem, NonStdInputIconWrapper } from './Input.styles';

type DropdownMarkupProps = {
  type: string;
  onInputFunc: (e: string) => void;
  dropdownList: string[];
  value: string;
};

type ListTypes = {
  complexity: number[];
  status: { name: string; icon: IconType }[];
  role: { name: string; icon: IconType }[];
};

export const listContent = {
  complexity: [1, 2, 3, 4, 5],
  status: [
    { name: 'Формування команди', icon: 'teamBuilding' },
    { name: 'В розробці', icon: 'ongoing' },
    { name: 'Завершено', icon: 'finished' },
  ],
  role: [
    { name: 'Design', icon: 'design' },
    { name: 'Backend', icon: 'backend' },
    { name: 'Front', icon: 'front' },
    { name: 'QA', icon: 'qa' },
    { name: 'SEO', icon: 'seo' },
    { name: 'Doc', icon: 'doc' },
    { name: 'None', icon: 'noRole' },
  ],
} as ListTypes;

export function DropdownMarkup({ type, onInputFunc, dropdownList, value }: DropdownMarkupProps) {
  let result;
  if (type === 'complexity') {
    result = listContent.complexity.map((item, idx) => {
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
  } else if (type === 'status' || type === 'role') {
    result = listContent[type].map((item) => {
      if (item.name.toLowerCase().includes(value.toLowerCase()))
        return (
          <DropdownItem key={item.name} onClick={() => onInputFunc(item.name)}>
            <NonStdInputIconWrapper style={{ marginRight: 16 }}>
              <IconSprite icon={item.icon} />
            </NonStdInputIconWrapper>
            {item.name}
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
