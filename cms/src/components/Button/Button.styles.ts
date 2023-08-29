import styled from '@emotion/styled';

import { colors, fonts, media } from '../../styles/theme';
import { breakpointDesktop } from '../../styles/vars';

export const PrimaryBtn = styled.button<{ isPressed: boolean; disabled: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 16px 24px;
  font-weight: 700;
  font-size: 22px;
  text-align: center;
  border-radius: 4px;
  color: #fcfcfc;
  background-color: #232323;
  border: none;
  cursor: pointer;
  text-wrap: nowrap;

  &:disabled {
    color: #939393;
    background-color: #cecece;
    cursor: default;
  }

  &:not(:disabled):hover {
    color: #ffbd00;
    background-color: #232323;
  }

  ${({ isPressed }) => (isPressed ? ' background-color: #ffbd00 !important; color: #232323 !important;' : '')}

  transition: all 250ms ease-in;
`;

export const TabBtn = styled(PrimaryBtn)<{ isSelected: boolean }>`
  font-size: 16px;
  font-weight: 600;
  padding: 8px 16px;
  justify-content: space-between;
  flex-direction: row-reverse;

  ${({ isSelected, isPressed }) =>
    !isSelected &&
    `
    background-color: #FCFCFC;
    color: #232323;

    &:disabled {
      color: #bfbfbf;
      background-color: #fcfcfc;
    }

    &:not(:disabled):hover {
      background-color: #fde8af;
      color: #121212;
    }

    ${isPressed ? ' background-color: #FFD210 !important; ' : ''}
  `}

  transition: all 250ms ease-in;
`;

export const TextBtn = styled(PrimaryBtn)`
  padding: 16px;
  font-weight: 600;
  font-size: 16px;
  border: 1px solid #232323;
  color: #232323;
  background-color: #fff;

  &:disabled {
    color: #bfbfbf;
    background-color: #fcfcfc;
    border-color: #bfbfbf;
  }

  &:not(:disabled):hover {
    background-color: #fde8af;
    color: #232323;
  }

  ${({ isPressed }) => (isPressed ? ' background-color: #232323 !important; color: #FDF5DD !important;' : '')}

  transition: all 250ms ease-in;
`;

export const IconBtn = styled(PrimaryBtn)`
  padding: 8px;
`;

export const PopUpBtn = styled.button`
  display: flex;
  align-items: center;
  font-size: 14px;
  line-height: 1;
  border: 0;
  padding: 5px 0;
  background-color: white;
  cursor: pointer;
  & > svg {
    width: 16px;
    height: 16px;
    margin-right: 8px;
  }
`;

export const PopUpBtnAccept = styled(PopUpBtn)`
  margin-right: 24px;
  color: #29ca56;
`;
export const PopUpBtnCancel = styled(PopUpBtn)`
  color: #df4242;
`;

export const NavBtn = styled(PrimaryBtn)<{ isPressed: boolean; btnClicked: boolean }>`
  padding: 8px 16px;
  justify-content: flex-start;
  font-weight: ${fonts.title.fontWeight.tablet};
  font-size: ${fonts.title.fontSize.tablet}px;
  letter-spacing: ${fonts.title.letterSpacing.tablet}px;
  border: transparent;
  color: ${({ btnClicked }) => (btnClicked ? colors.white : colors.mainText)};
  background-color: ${({ btnClicked }) => (btnClicked ? colors.mainLabel : colors.white)};

  &:not(:disabled):hover {
    background-color: ${({ btnClicked }) => (btnClicked ? colors.mainText : colors.textAccent)};
    color: ${({ btnClicked }) => (btnClicked ? colors.mainAccent : colors.mainText)};
  }

  ${({ isPressed }) =>
    isPressed ? ` background-color: ${colors.mainLabel} !important; color: ${colors.textAccent} !important;` : ''}
`;

export const SubNavBtn = styled(NavBtn)<{ isPressed: boolean; btnClicked: boolean; titleContinuation: boolean }>`
  position: relative;
  font-weight: ${fonts.body.fontWeight};
  font-size: ${fonts.body.fontSize.desktop}px;
  letter-spacing: 0px;
  border-bottom: 1px solid ${colors.disabledBtnBg};

  @media screen and (${media.desktop}) {
    &:after {
      position: absolute;
      content: ${({ titleContinuation }) => (titleContinuation ? "'команди'" : "''")};
      left: 48%;
    }
  }
`;

export const GoBackBtn = styled(IconBtn)`
  display: none;
  position: absolute;
  width: fit-content;
  right: 0;
  bottom: 0;
  border-radius: 4px 0px;

  @media screen and (min-width: ${breakpointDesktop}px) {
    display: flex;
  }
`;

export const SignOutBtn = styled(TextBtn)`
  letter-spacing: ${fonts.title.letterSpacing.tablet}px;
  width: 112px;
  @media screen and (${media.tablet}) {
    margin-bottom: 16px;
  }
`;
