'use client';
/** @jsxImportSource @emotion/react */
import { useState } from 'react';

import { IconSprite, IconType } from '../IconSprite/IconSprite';
import { GoBackBtn, IconBtn, PopUpBtnAccept, PopUpBtnCancel, PrimaryBtn, TextBtn } from './Button.styles';

type ButtonProps = {
  isDisabled?: boolean;
  func?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
  btnType?: 'button' | 'submit' | 'reset';
  variant: 'primary' | 'text' | 'icon' | 'accept' | 'cancel' | 'goBack';
  icon?: IconType | null;
  title?: string;
};

export const Button = ({ isDisabled, func, variant, title, icon = null, btnType = 'button' }: ButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const onClickHandler = (ev: React.MouseEvent<HTMLButtonElement>) => {
    if (func) func(ev);
  };

  const btnVariants = {
    primary: PrimaryBtn,
    text: TextBtn,
    icon: IconBtn,
    accept: PopUpBtnAccept,
    cancel: PopUpBtnCancel,
    goBack: GoBackBtn,
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
