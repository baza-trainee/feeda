import styled from '@emotion/styled';

import { colors } from '../../styles/theme';

export const MainWrapper = styled.div``;

export const LabelComp = styled.label<{ inputValueLen: number; isDisabled: boolean; checkIsValid: boolean }>`
  --txtColor: ${({ inputValueLen, isDisabled }) =>
    isDisabled ? colors.disabledBtnBg : inputValueLen ? colors.mainPlaceholder : colors.mainLabel};
  display: inline-block;
  margin-bottom: 4px;
  font-size: 16px;
  font-weight: 400;
  color: var(--txtColor);
  &:has(+ div > input:invalid) {
    color: #dc0c31;
  }
  &:has(+ div > input:valid) {
    color: ${({ checkIsValid }) => (checkIsValid ? '#14905D' : 'var(--txtColor)')};
  }
  &:has(+ div > input:focus) {
    color: var(--txtColor);
  }
`;

export const InputWrapper = styled.div<{
  checkIsValid: boolean;
  dropdownList: boolean;
  endIconId: boolean;
}>`
  position: relative;
  display: flex;
  align-items: center;
  border: solid 1px #14905d;
  border-radius: 4px;
  border: 1px solid #cecece;
  /* margin: 4px 0; */
  padding: 0 16px;
  background: '#fcfcfc';
  &:has(input:invalid) {
    outline: 2px solid #dc0c31;
    & ~ label {
      color: #dc0c31;
    }
  }

  ${({ checkIsValid }) => {
    if (checkIsValid) {
      return '&:has(input:valid) { \
        outline: 2px solid #14905D; \
        & ~ label { \
          color: #14905D; \
        }}';
    }
  }}

  ${({ dropdownList }) => {
    if (dropdownList) {
      return '&:has(input:focus) { \
        & > ul {                   \
          max-height: 168px;         \
          & ~ label {                \
            color: #14905D;          \
            }                          \
          }                       \
        }';
    }
  }}

  &:has(input:focus) {
    outline: 2px solid #939393;
    & ~ label {
      color: #49454f;
    }
  }
`;

export const InputComp = styled.input<{ dropdownList: boolean }>`
  display: inline-block;
  width: 100%;
  border-radius: 4px;
  border: 0;
  color: ${colors.mainText};
  font-size: 16px;
  font-weight: 400;
  padding: 16px 0;
  background: transparent;
  &::-webkit-input-placeholder {
    color: ${colors.mainPlaceholder};
  }
  ${({ dropdownList }) => {
    if (dropdownList) {
      return '& + div > svg { \
        transition: transform 0.2s ease-in-out; \
      } \
      &:focus + div > svg { \
        transform: rotateX(180deg);  \
      }';
    }
  }}
`;

export const InputIconWrapper = styled.div<{ isDisabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 12px 16px 0;
  color: ${({ isDisabled }) => (isDisabled ? colors.disabledBtnBg : 'initial')};
`;

export const DropdownList = styled.ul`
  position: absolute;
  width: 101%;
  left: 50%;
  transform: translate(-50%, 100%);
  bottom: -3px;
  background-color: white;
  max-height: 0;
  overflow-y: auto;
  transition: max-height 0.2s ease-in-out;
`;

export const DropdownItem = styled.li`
  border-radius: 4px;
  margin-bottom: 4px;
  padding: 18px 16px;
  font-size: 16px;
  font-weight: 400;
  color: ${colors.mainText};
  background-color: #fcfcfc;
  cursor: pointer;
  &:hover {
    background-color: #fdf5dd;
  }
  &:active {
    background-color: #232323;
    color: ${colors.mainBtnText};
  }
  &:last-child {
    margin-bottom: 4px;
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
