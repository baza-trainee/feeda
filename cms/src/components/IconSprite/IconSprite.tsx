import { CSSProperties } from 'react';

import {
  Add,
  ArrowDown,
  ArrowLeft,
  Backend,
  Calendar,
  Checkmark,
  ComplexityActive,
  Cross,
  Delete,
  Design,
  Edit,
  EmptyCircle,
  Exit,
  EyeClosed,
  EyeOpen,
  Finished,
  Front,
  Ongoing,
  OpenMenu,
  Pencil,
  Plus,
  Pm,
  Qa,
  RoundCheckmark,
  SearchIcon,
  Seo,
  Team,
  TeamBuilding,
  Trash,
} from '../../../public';

export const IconSprite = ({ icon, style }: { icon: IconType; style?: CSSProperties | undefined }) => {
  const icons: Record<IconType, JSX.Element> = {
    add: <Add />,
    arrowDown: <ArrowDown />,
    arrowLeft: <ArrowLeft />,
    backend: <Backend />,
    calendar: <Calendar />,
    checkmark: <Checkmark />,
    complexityActive: <ComplexityActive />,
    complexityInactive: <EmptyCircle />,
    cross: <Cross />,
    delete: <Delete />,
    design: <Design />,
    edit: <Edit />,
    exit: <Exit />,
    eyeClosed: <EyeOpen />,
    eyeOpen: <EyeClosed />,
    finished: <Finished />,
    front: <Front />,
    noRole: <EmptyCircle />,
    ongoing: <Ongoing />,
    openMenu: <OpenMenu />,
    pencil: <Pencil />,
    plus: <Plus />,
    pm: <Pm />,
    qa: <Qa />,
    roundCheckmark: <RoundCheckmark />,
    search: <SearchIcon />,
    seo: <Seo />,
    team: <Team />,
    teamBuilding: <TeamBuilding />,
    trash: <Trash />,
  };

  const selectedIcon = icons[icon];

  if (!selectedIcon) {
    return null;
  }

  return <span style={style}>{selectedIcon}</span>;
};

export const iconTypes = {
  add: 'add',
  arrowDown: 'arrowDown',
  arrowLeft: 'arrowLeft',
  backend: 'backend',
  calendar: 'calendar',
  checkmark: 'checkmark',
  complexityActive: 'complexityActive',
  complexityInactive: 'complexityInactive',
  cross: 'cross',
  delete: 'delete',
  design: 'design',
  edit: 'edit',
  exit: 'exit',
  eyeClosed: 'eyeClosed',
  eyeOpen: 'eyeOpen',
  finished: 'finished',
  front: 'front',
  noRole: 'noRole',
  ongoing: 'ongoing',
  openMenu: 'openMenu',
  pencil: 'pencil',
  plus: 'plus',
  pm: 'pm',
  qa: 'qa',
  roundCheckmark: 'roundCheckmark',
  search: 'search',
  seo: 'seo',
  team: 'team',
  teamBuilding: 'teamBuilding',
  trash: 'trash',
} as const;

export type IconType = keyof typeof iconTypes;
