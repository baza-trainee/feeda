'use client';

import Next from '../../../public/next.svg';
import Vercel from '../../../public/vercel.svg';
import { Input } from './Input';

export function InputTester() {
  return (
    <Input
      placeholder="placeholder"
      type="text"
      value="value"
      name="test"
      id="test"
      label="label"
      supportLabel="supportLabel"
      //   disabled={false}
      //   begIcon={<Next />}
      //   endIcon={<Vercel />}
      onInputFunc={(ev) => console.log(ev.target.value)}
      //   inputCss
      //   labelCss,
      //   supportLabelCss,
    />
  );
}
