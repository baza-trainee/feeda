'use client';
/** @jsxImportSource @emotion/react */
import { ReactNode, useState } from 'react';
import { PrimaryBtn, TextBtn } from './Button.styles';
import Image from 'next/image';

type ButtonProps = {
  children?: ReactNode | string;
  isDisabled?: boolean;
  func?: () => void;
  btnType?: 'button' | 'submit';
  variant: 'primary' | 'text';
};

export const Button = ({ children, isDisabled, func, variant, btnType = 'button' }: ButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (func) func();
  };

  const ButtonComponent = variant === 'text' ? TextBtn : PrimaryBtn;

  return (
    <ButtonComponent
      onClick={onClickHandler}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      disabled={isDisabled || false}
      isPressed={isPressed}
      type={btnType}
    >
      {children}
    </ButtonComponent>
  );
};
