import { MemberRole } from './MemberRole';
import { ProjectDifficulty } from './ProjectDifficulty';
import { ProjectState } from './ProjectState';
import { ProjectType } from './ProjectsType';

export const getProjectStatus = (value: string | number) =>
  value ? projectStatus.find((item) => item.value === value) || { value: '', label: '' } : { value: '', label: '' };
export const getRole = (value: string | number) =>
  value ? membersRole.find((item) => item.value === value) || { value: '', label: '' } : { value: '', label: '' };
export const getComplixity = (value: string | number) =>
  value ? projectDifficulty.find((item) => item.value === value) || { value: '', label: '' } : { value: '', label: '' };
export const getProjectType = (value: string | number) =>
  value ? projectType.find((item) => item.value === value) || { value: '', label: '' } : { value: '', label: '' };

export interface ListProps {
  value: string | number;
  label: JSX.Element;
}

export const projectStatus: ListProps[] = [
  {
    value: 'team_formation',
    label: <ProjectState type="green" title="Формування команди" />,
  },
  {
    value: 'developing',
    label: <ProjectState type="yellow" title="В розробці" />,
  },
  {
    value: 'ended',
    label: <ProjectState type="orange" title="Завершено" />,
  },
];

export const membersRole: ListProps[] = [
  {
    value: 'design',
    label: <MemberRole type="green" title="Design" />,
  },
  {
    value: 'backend',
    label: <MemberRole type="yellow" title="Backend" />,
  },
  {
    value: 'front',
    label: <MemberRole type="orange" title="Front" />,
  },
  {
    value: 'qa',
    label: <MemberRole type="red" title="QA" />,
  },
  {
    value: 'seo',
    label: <MemberRole type="violet" title="SEO" />,
  },
  {
    value: 'doc',
    label: <MemberRole type="blue" title="Doc" />,
  },
  {
    value: 'none',
    label: <MemberRole type="empty" title="None" />,
  },
];

export const projectDifficulty: ListProps[] = [
  {
    value: 1,
    label: <ProjectDifficulty type={1} />,
  },
  {
    value: 2,
    label: <ProjectDifficulty type={2} />,
  },
  {
    value: 3,
    label: <ProjectDifficulty type={3} />,
  },
  {
    value: 4,
    label: <ProjectDifficulty type={4} />,
  },
  {
    value: 5,
    label: <ProjectDifficulty type={5} />,
  },
];

export const projectType: ListProps[] = [
  {
    value: 'for free',
    label: <ProjectType title="безкоштовний" />,
  },
  {
    value: 'paid',
    label: <ProjectType title="платний" />,
  },
  {
    value: 'bootcamp',
    label: <ProjectType title="буткамп" />,
  },
];
