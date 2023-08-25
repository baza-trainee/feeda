import {
  Add,
  ArrowDown,
  Backend,
  Calendar,
  Checkmark,
  ComplexityActive,
  Cross,
  Delete,
  Design,
  Doc,
  Edit,
  EmptyCircle,
  Exit,
  Finished,
  Front,
  Ongoing,
  Pencil,
  Plus,
  Qa,
  RoundCheckmark,
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
    doc: <Doc />,
    noRole: <EmptyCircle />,
    trash: <Trash />,
    roundCheckmark: <RoundCheckmark />,
    checkmark: <Checkmark />,
    cross: <Cross />,
    calendar: <Calendar />,
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
  doc: 'doc',
  noRole: 'noRole',
  trash: 'trash',
  roundCheckmark: 'roundCheckmark',
  checkmark: 'checkmark',
  cross: 'cross',
  calendar: 'calendar',
} as const;

export type IconType = keyof typeof iconTypes;
