import { IconType } from '../components/IconSprite/IconSprite';

type ListTypes = {
  complexity: number[];
  status: { name: string; icon: IconType }[];
  role: { name: string; icon: IconType }[];
};

export const commonVariants = {
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
