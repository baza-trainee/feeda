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

export const IconSprite = ({ icon }: { icon: IconType }) => {
  const icons: Record<IconType, JSX.Element> = {
    exit: <Exit />,
    add: <Add />,
    delete: <Delete />,
    edit: <Edit />,
    plus: <Plus />,
    pencil: <Pencil />,
    team: <Team />,
    arrowDown: <ArrowDown />,
    complexityInactive: <EmptyCircle />,
    complexityActive: <ComplexityActive />,
    teamBuilding: <TeamBuilding />,
    ongoing: <Ongoing />,
    finished: <Finished />,
    design: <Design />,
    backend: <Backend />,
    front: <Front />,
    qa: <Qa />,
    seo: <Seo />,
    pm: <Pm />,
    noRole: <EmptyCircle />,
    trash: <Trash />,
    roundCheckmark: <RoundCheckmark />,
    checkmark: <Checkmark />,
    cross: <Cross />,
    search: <SearchIcon />,
    arrowLeft: <ArrowLeft />,
    calendar: <Calendar />,
    openMenu: <OpenMenu />,
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
  pencil: 'pencil',
  team: 'team',
  arrowDown: 'arrowDown',
  complexityInactive: 'complexityInactive',
  complexityActive: 'complexityActive',
  teamBuilding: 'teamBuilding',
  ongoing: 'ongoing',
  finished: 'finished',
  design: 'design',
  backend: 'backend',
  front: 'front',
  qa: 'qa',
  seo: 'seo',
  pm: 'pm',
  noRole: 'noRole',
  trash: 'trash',
  roundCheckmark: 'roundCheckmark',
  checkmark: 'checkmark',
  cross: 'cross',
  search: 'search',
  arrowLeft: 'arrowLeft',
  calendar: 'calendar',
  openMenu: 'openMenu',
} as const;

export type IconType = keyof typeof iconTypes;
