/* eslint-disable no-empty-pattern */
import { forwardRef, InputHTMLAttributes } from 'react';

import { Box, Input, Wrapper } from './Checkbox.styled';

type formElementProps = InputHTMLAttributes<HTMLInputElement>;

export const CheckBox = forwardRef<HTMLInputElement, formElementProps>(({}, ref) => {
  return (
    <Wrapper>
      <label>
        <Input type="checkbox" ref={ref} />
        <Box id="box" />
      </label>
      <span>Запам&#39;ятати пароль</span>
    </Wrapper>
  );
});

CheckBox.displayName = 'CheckBox';
