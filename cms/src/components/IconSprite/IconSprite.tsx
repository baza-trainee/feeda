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
  EyeClosed,
  EyeOpen,
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
    add: <Add />,
    arrowDown: <ArrowDown />,
    backend: <Backend />,
    calendar: <Calendar />,
    checkmark: <Checkmark />,
    complexityActive: <ComplexityActive />,
    complexityInactive: <EmptyCircle />,
    cross: <Cross />,
    delete: <Delete />,
    design: <Design />,
    doc: <Doc />,
    edit: <Edit />,
    exit: <Exit />,
    eyeClosed: <EyeOpen />,
    eyeOpen: <EyeClosed />,
    finished: <Finished />,
    front: <Front />,
    noRole: <EmptyCircle />,
    ongoing: <Ongoing />,
    pencil: <Pencil />,
    plus: <Plus />,
    qa: <Qa />,
    roundCheckmark: <RoundCheckmark />,
    seo: <Seo />,
    team: <Team />,
    teamBuilding: <TeamBuilding />,
    trash: <Trash />,
  };

  const selectedIcon = icons[icon];

  if (!selectedIcon) {
    return null;
  }

  return selectedIcon;
};

export const iconTypes = {
  add: 'add',
  arrowDown: 'arrowDown',
  backend: 'backend',
  calendar: 'calendar',
  checkmark: 'checkmark',
  complexityActive: 'complexityActive',
  complexityInactive: 'complexityInactive',
  cross: 'cross',
  delete: 'delete',
  design: 'design',
  doc: 'doc',
  edit: 'edit',
  exit: 'exit',
  eyeClosed: 'eyeClosed',
  eyeOpen: 'eyeOpen',
  finished: 'finished',
  front: 'front',
  noRole: 'noRole',
  ongoing: 'ongoing',
  pencil: 'pencil',
  plus: 'plus',
  qa: 'qa',
  roundCheckmark: 'roundCheckmark',
  seo: 'seo',
  team: 'team',
  teamBuilding: 'teamBuilding',
  trash: 'trash',
} as const;

export type IconType = keyof typeof iconTypes;
