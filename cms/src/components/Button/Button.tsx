'use client';
/** @jsxImportSource @emotion/react */
import { useState } from 'react';

import { IconSprite, IconType } from '../IconSprite/IconSprite';
import {
  GoBackBtn,
  IconBtn,
  NavBtn,
  PopUpBtnAccept,
  PopUpBtnCancel,
  PrimaryBtn,
  SubNavBtn,
  TabBtn,
  TextBtn,
} from './Button.styles';

type ButtonProps = {
  isDisabled?: boolean;
  func?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  btnType?: 'button' | 'submit' | 'reset';
  id?: string;
  variant: 'primary' | 'text' | 'icon' | 'accept' | 'cancel' | 'tab' | 'goBack' | 'nav' | 'subnav';

  icon?: IconType | null;
  secondIcon?: IconType | null;
  title?: string;
  btnClicked?: boolean;
  titleContinuation?: boolean;
  isSelected?: boolean;
};

export const Button = ({
  isDisabled,
  func,
  variant,
  title,
  icon = null,
  secondIcon = null,
  btnType = 'button',
  btnClicked = false,
  titleContinuation = false,
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
    nav: NavBtn,
    subnav: SubNavBtn,
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
      btnClicked={btnClicked}
      titleContinuation={titleContinuation}
    >
      {icon && <IconSprite icon={icon} style={{ height: '24px' }} />}
      {title}
      {secondIcon && (
        <IconSprite
          icon={secondIcon}
          style={{
            marginLeft: 'auto',
            height: '24px',
            transform: btnClicked ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 250ms ease-in-out',
          }}
        />
      )}
    </ButtonComponent>
  );
};
