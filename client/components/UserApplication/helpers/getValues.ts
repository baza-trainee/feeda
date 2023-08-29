import { experience } from '../lists';

export const getExpValue = (value: string) => value && experience.find((item) => item.value);
