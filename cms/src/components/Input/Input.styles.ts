import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { colors } from '../../styles/theme';

export const LabelComp = styled.label<{
  inputValueLen: boolean;
  isDisabled: boolean;
  checkIsValid: boolean;
  isError: boolean;
}>`
  --txtColor: ${({ inputValueLen, isDisabled }) =>
    isDisabled ? colors.disabledBtnBg : inputValueLen ? colors.mainPlaceholder : colors.mainLabel};
  display: inline-block;
  margin-bottom: 4px;
  font-size: 16px;
  font-weight: 400;
  color: var(--txtColor);

  ${({ checkIsValid }) =>
    checkIsValid &&
    '&:has(+ div > input:invalid) {  \
        color: #dc0c31; \
      } \
      &:has(+ div > input:valid) {  \
        color: #14905D  \
      }'}

  ${({ isError }) => isError && 'color: #dc0c31;'}

  &:has(+ div > input:focus) {
    color: var(--txtColor);
  }
`;

export const InputWrapper = styled.div<{ checkIsValid: boolean; isError: boolean; begIcon: boolean; endIcon: boolean }>`
  display: flex;
  align-items: center;
  position: relative;
  border-radius: 4px;
  border: 1px solid #cecece;
  background: #fcfcfc;

  & + label#support-label {
    visibility: hidden;
  }
  & + label#on-valid-label {
    position: absolute;
    visibility: hidden;
    color: #14905d;
  }

  ${({ checkIsValid }) =>
    checkIsValid &&
    '&:has(input:valid) { \
        outline: 2px solid #14905D; \
        border: 1px solid transparent; \
        & + label#on-valid-label {  \
          visibility: visible; \
        } \
      } \
        &:has(input:invalid) {  \
          outline: 2px solid #dc0c31; \
          border: 1px solid transparent; \
          & + label#support-label { \
            visibility: visible; \
            color: #dc0c31; \
          } \
        }'}

  ${({ isError }) =>
    isError &&
    'outline: 2px solid #dc0c31; \
    & + label#support-label { \
      visibility: visible; \
      color: #dc0c31; \
    }'}     

  &:has(input:focus) {
    outline: 2px solid #939393;
    border: 1px solid transparent;
    & + label#support-label {
      visibility: hidden;
    }
    & + label#on-valid-label {
      visibility: hidden;
    }
  }
  & > .react-datepicker-wrapper {
    width: 100%;
    & > div > input {
      padding: ${({ begIcon, endIcon }) =>
        begIcon && endIcon ? '18px 0' : begIcon ? '18px 18px 18px 0' : endIcon ? '18px 0 18px 18px' : '18px 16px'};
    }
  }
`;

export const inputStyles = css`
  display: inline-block;
  width: 100%;
  border-radius: 4px;
  border: 0;
  color: ${colors.mainText};
  font-size: 16px;
  font-weight: 400;
  background: transparent;
  &::-webkit-input-placeholder {
    color: ${colors.mainPlaceholder};
  }
  &:focus {
    &::-webkit-input-placeholder {
      color: white;
    }
  }
`;

export const InputComp = styled.input<{ begIcon: boolean; endIcon: boolean }>`
  ${inputStyles}
  padding: ${({ begIcon, endIcon }) =>
    begIcon && endIcon ? '18px 0' : begIcon ? '18px 18px 18px 0' : endIcon ? '18px 0 18px 18px' : '18px 16px'};
`;

export const InputIconWrapper = styled.div<{ isDisabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  color: ${({ isDisabled }) => (isDisabled ? colors.disabledBtnBg : 'initial')};

  & path {
    fill: #939393;
  }
`;

export const SupportLabelComp = styled.label<{ isDisabled: boolean }>`
  color: ${({ isDisabled }) => (isDisabled ? colors.disabledBtnBg : '#49454f')};
  display: inline-block;
  margin-top: 4px;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.33;
  letter-spacing: 0.5px;
`;

export const firstIconStyles = css`
  padding-right: 12px;
`;

export const lastIconStyles = css`
  padding-left: 12px;
`;
