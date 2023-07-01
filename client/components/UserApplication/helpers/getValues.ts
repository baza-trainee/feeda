import { experience, projects, type } from '../lists';

export const getExpValue = (value: string) => (value ? experience.find((item) => item.value === value) : '');

export const getProjValue = (value: string) => (value ? projects.find((item) => item.value === value) : '');

export const getTypeValue = (value: string) => (value ? type.find((item) => item.value === value) : '');
