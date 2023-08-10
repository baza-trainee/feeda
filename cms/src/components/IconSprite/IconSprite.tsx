import Add from '../../../public/add.svg';
import ArrowDown from '../../../public/arrow_down.svg';
import Delete from '../../../public/delete.svg';
import Edit from '../../../public/edit.svg';
import Exit from '../../../public/exit.svg';
import Pensil from '../../../public/pensil.svg';
import Plus from '../../../public/plus.svg';
import Team from '../../../public/team.svg';

export const IconSprite = ({ icon }: { icon: IconType }) => {
  const icons: Record<IconType, JSX.Element> = {
    exit: <Exit />,
    add: <Add />,
    delete: <Delete />,
    edit: <Edit />,
    plus: <Plus />,
    pensil: <Pensil />,
    team: <Team />,
    arrowDown: <ArrowDown />,
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
  pensil: 'pensil',
  team: 'team',
  arrowDown: 'arrowDown',
} as const;

export type IconType = keyof typeof iconTypes;
