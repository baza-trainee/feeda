import styled from '@emotion/styled';

import { colors } from '../../styles/theme';

export const LabelComp = styled.label<{ inputValueLen: number; isDisabled: boolean; checkIsValid: boolean }>`
  --txtColor: ${({ inputValueLen, isDisabled }) =>
    isDisabled ? colors.disabledBtnBg : inputValueLen ? colors.mainPlaceholder : colors.mainLabel};
  display: inline-block;
  margin-bottom: 4px;
  font-size: 16px;
  font-weight: 400;
  color: var(--txtColor);

  ${({ checkIsValid }) => {
    if (checkIsValid) {
      return '&:has(+ div > input:invalid) {  \
        color: #dc0c31; \
      } \
      &:has(+ div > input:valid) {  \
        color: #14905D  \
      }';
    }
  }}

  &:has(+ div > input:focus) {
    color: var(--txtColor);
  }
`;

export const InputWrapper = styled.div<{ checkIsValid: boolean }>`
  display: flex;
  align-items: center;
  border: solid 1px #14905d;
  border-radius: 4px;
  border: 1px solid #cecece;
  /* padding: 0 16px; */
  background: #fcfcfc;

  ${({ checkIsValid }) => {
    if (checkIsValid) {
      return '&:has(input:valid) { \
        outline: 2px solid #14905D; \
        & + label#support-label { \
          color: #14905D; \
        }}  \
        &:has(input:invalid) {  \
          outline: 2px solid #dc0c31; \
          & + label#support-label { \
            color: #dc0c31; \
          } \
        }';
    }
  }}

  &:has(input:focus) {
    outline: 2px solid #939393;
    & + label#support-label {
      color: #49454f;
    }
  }
`;

export const InputComp = styled.input`
  display: inline-block;
  width: 100%;
  border-radius: 4px;
  border: 0;
  color: ${colors.mainText};
  font-size: 16px;
  font-weight: 400;
  /* padding: 16px; */
  background: transparent;
  &::-webkit-input-placeholder {
    color: ${colors.mainPlaceholder};
  }
`;

export const InputIconWrapper = styled.div<{ isDisabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  color: ${({ isDisabled }) => (isDisabled ? colors.disabledBtnBg : 'initial')};
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
