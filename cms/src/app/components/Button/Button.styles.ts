import styled from '@emotion/styled';

export const PrimaryBtn = styled.button<{ isPressed: boolean; disabled: boolean }>`
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

  &:disabled {
    color: #939393;
    background-color: #cecece;
    cursor: default;
  }

  &:not(:disabled):hover,
  :not(:disabled):focus {
    color: #ffbd00;
    background-color: #232323;
  }

  ${({ isPressed }) =>
    isPressed
      ? ' background-color: #ffbd00 !important; border: 1px solid #ffbd00 !important; color: #232323 !important;'
      : ''}

  transition: all 250ms ease-in;
`;
