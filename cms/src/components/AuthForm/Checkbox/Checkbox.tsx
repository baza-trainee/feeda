/* eslint-disable no-empty-pattern */
import { ChangeEvent, forwardRef, InputHTMLAttributes, useEffect, useState } from 'react';

import { Box, Input, Wrapper } from './Checkbox.styled';

type formElementProps = InputHTMLAttributes<HTMLInputElement>;

export const CheckBox = forwardRef<HTMLInputElement, formElementProps>(({}, ref) => {
  const [rememberCredentials, setRememberCredentials] = useState<boolean>(false);

  useEffect(() => {
    const remember = localStorage.getItem('remember');
    remember === 'true' && setRememberCredentials(true);
  }, []);

  return (
    <Wrapper>
      <label>
        <Input
          type="checkbox"
          ref={ref}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setRememberCredentials(event.target.checked)}
          checked={rememberCredentials}
        />
        <Box id="box" />
      </label>
      <span>Запам&#39;ятати пароль</span>
    </Wrapper>
  );
});

CheckBox.displayName = 'CheckBox';
