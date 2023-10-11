import { StylesConfig } from 'react-select';

import styled from '@emotion/styled';

export type SelectStateIconType = 'Завершений' | 'В розробці' | null;
export type SelectRoleIconType = 'green' | 'yellow' | 'orange' | 'red' | 'violet' | 'blue' | 'empty';
export type SelectDifficultyType = 1 | 2 | 3 | 4 | 5 | null;

export const SelectItem = styled.div`
  display: flex;
  align-items: center;
`;

export const SelectTextItem = styled(SelectItem)`
  padding: 8px;
`;

export const SelectIconWrapper = styled.div`
  width: 40px;
  height: 40px;
  padding: 8px;
`;

export const SelectIcon = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

export const SelectDifficultyIcon = styled(SelectIcon)<{ type: SelectDifficultyType; isCardItem: boolean | undefined }>`
  width: ${({ isCardItem }) => (isCardItem ? '16px' : '24px')};
  height: ${({ isCardItem }) => (isCardItem ? '16px' : '24px')};
  border: 1px solid black;
  background-color: ${({ isCardItem }) => (isCardItem ? '' : 'fff')};

  &:nth-child(-n + ${({ type }) => type}) {
    background-color: black;
  }
`;

export const SelectDifficulty = styled(SelectItem)<{ isCardItem: boolean | undefined }>`
  gap: ${({ isCardItem }) => (isCardItem ? '8px' : '16px')};
  padding: ${({ isCardItem }) => (isCardItem ? '0' : '8px')};
`;

export const SelectStateIcon = styled(SelectIcon)<{ type: SelectStateIconType }>`
  background-color: ${({ type }) => {
    if (type === 'Завершений') return '#EB903C';
    if (type === 'В розробці') return '#EBCF3C';
    if (type === null) return '';
    return 'transparent';
  }};
`;

export const SelectRoleIcon = styled(SelectIcon)<{ type: SelectRoleIconType }>`
  background-color: ${({ type }) => {
    if (type === 'green') return '#74BE4F';
    if (type === 'orange') return '#D36C0C';
    if (type === 'yellow') return '#C0971F';
    if (type === 'red') return '#D92A13';
    if (type === 'violet') return '#5E4DB2';
    if (type === 'blue') return '#0055CC';
    if (type === 'empty') return 'none';
    return 'transparent';
  }};
  border: ${({ type }) => {
    if (type === 'empty') return '1px solid black';
    return 'none';
  }};
`;

export const SelectText = styled.p`
  font-size: 16px;
  font-weight: 400;
`;

export const Label = styled.label`
  color: #353535;
  font-size: 16px;
  flex-direction: column;
  display: flex;
  gap: 4px;
  line-height: normal;
`;

export const ErrorText = styled.p`
  color: #df4242;
  font-size: 12px;
  letter-spacing: 0.5px;
  position: absolute;
  bottom: -20px;
`;

interface ProvidedStyles {
  control: StylesConfig['control'];
  indicatorSeparator: StylesConfig['indicatorSeparator'];
  valueContainer: StylesConfig['valueContainer'];
  input: StylesConfig['input'];
  dropdownIndicator: StylesConfig['dropdownIndicator'];
  menu: StylesConfig['menu'];
  option: StylesConfig['option'];
  singleValue: StylesConfig['singleValue'];
}

export const selectStyles = (error: boolean, isDropdownOpen: boolean, isDisabled: boolean): ProvidedStyles => ({
  control: (provided, { menuIsOpen }) => ({
    ...provided,
    border: `1px solid ${error ? 'red' : menuIsOpen ? '#939393 !important' : '#CECECE'}`,
    boxShadow: 'none',
    borderRadius: '4px',
    padding: '8px',
    cursor: 'pointer',
    backgroundColor: isDisabled ? '#fff' : '#fff',
    ':hover': {
      borderColor: `${error ? 'red' : '#CECECE'}`,
    },
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: 0,
    margin: 0,
    height: 40,
  }),
  input: (provided) => ({
    ...provided,
    margin: 0,
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: '#939393',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0)',
  }),
  menu: (provided) => ({
    ...provided,
    border: 'none',
    boxShadow: 'none',
    backgroundColor: '#FCFCFC',
    borderRadius: '4px',
    margin: '4px 0 0 0 ',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#FDF5DD' : '#FCFCFC',
    color: '#232323',
    borderRadius: '4px',
    height: '56px',
    display: 'flex',
    alignItems: 'center',
    padding: '0 16px',
    ':active': {
      color: '#FCFCFC',
      backgroundColor: '#232323',
    },
  }),
  singleValue: () => ({
    position: 'absolute',
    color: '#353535',
  }),
});
