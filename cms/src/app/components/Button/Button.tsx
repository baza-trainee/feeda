'use client';
/** @jsxImportSource @emotion/react */
import { ReactNode, useState } from 'react';
import { PrimaryBtn } from './Button.styles';

type ButtonProps = {
  children?: ReactNode | string;
  isDisabled?: boolean;
  func?: () => void;
  btnType: 'button' | 'submit';
};

export const Button = ({ children, isDisabled, func, btnType }: ButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (func) func();
  };

  return (
    <PrimaryBtn
      onClick={onClickHandler}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      disabled={isDisabled || false}
      isPressed={isPressed}
    >
      {children}
    </PrimaryBtn>
  );
};
