import Exit from '../../../public/exit.svg';
import Add from '../../../public/add.svg';
import Edit from '../../../public/edit.svg';
import Delete from '../../../public/delete.svg';
import Plus from '../../../public/plus.svg';

export const IconSprite = ({ icon }: { icon: IconType }) => {
  const icons: Record<IconType, JSX.Element> = {
    exit: <Exit />,
    add: <Add />,
    delete: <Delete />,
    edit: <Edit />,
    plus: <Plus />,
  };

  const selectedIcon = icons[icon];

  if (!selectedIcon) {
    return null;
  }

  return selectedIcon;
};

export const iconTypes = {
  exit: 'exit',
  add: 'add',
  delete: 'delete',
  edit: 'edit',
  plus: 'plus',
} as const;

export type IconType = keyof typeof iconTypes;
