'use client';
/** @jsxImportSource @emotion/react */
import { useState } from 'react';

import { IconBtn, PrimaryBtn, TextBtn } from './Button.styles';
import { IconSprite, IconType } from '../IconSprite/IconSprite';

type ButtonProps = {
  isDisabled?: boolean;
  func?: () => void;
  btnType?: 'button' | 'submit' | 'reset';
  variant: 'primary' | 'text' | 'icon';
  icon?: IconType | null;
  title?: string;
};

export const Button = ({ isDisabled, func, variant, title, icon = null, btnType = 'button' }: ButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const onClickHandler = () => {
    if (func) func();
  };

  const btnVariants = {
    primary: PrimaryBtn,
    text: TextBtn,
    icon: IconBtn,
  };

  const ButtonComponent = btnVariants[variant] || PrimaryBtn;

  return (
    <ButtonComponent
      onClick={onClickHandler}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      disabled={isDisabled || false}
      isPressed={isPressed}
      type={btnType}
      title={title}
    >
      {icon && <IconSprite icon={icon} />}
      {title}
    </ButtonComponent>
  );
};
