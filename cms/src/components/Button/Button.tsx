'use client';
/** @jsxImportSource @emotion/react */
import { useState } from 'react';

import { IconSprite, IconType } from '../IconSprite/IconSprite';
import { GoBackBtn, IconBtn, PopUpBtnAccept, PopUpBtnCancel, PrimaryBtn, TabBtn, TextBtn } from './Button.styles';

type ButtonProps = {
  isDisabled?: boolean;
  func?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  btnType?: 'button' | 'submit' | 'reset';
  id?: string;
  variant: 'primary' | 'text' | 'icon' | 'accept' | 'cancel' | 'tab' | 'goBack';
  icon?: IconType | null;
  title?: string;
  isSelected?: boolean;
};

export const Button = ({
  isDisabled,
  func,
  variant,
  title,
  icon = null,
  btnType = 'button',
  isSelected = false,
  id,
}: ButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const onClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    func && func(event);
  };

  const btnVariants = {
    primary: PrimaryBtn,
    text: TextBtn,
    icon: IconBtn,
    accept: PopUpBtnAccept,
    cancel: PopUpBtnCancel,
    goBack: GoBackBtn,
    tab: TabBtn,
  };

  const ButtonComponent = btnVariants[variant] || PrimaryBtn;

  return (
    <ButtonComponent
      id={id}
      isSelected={isSelected}
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
