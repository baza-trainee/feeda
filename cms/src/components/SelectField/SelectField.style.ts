import styled from '@emotion/styled';
import { StylesConfig } from 'react-select';

export const SelectItem = styled.div`
  display: flex;
  align-items: center;
`;

export type SelectItemIconType = 'orange' | 'green' | 'yellow';

export const SelectIconWrapper = styled.div`
  width: 40px;
  height: 40px;
  padding: 8px;
`;

export const SelectItemIcon = styled.div<{ type: SelectItemIconType }>`
  width: 100%;
  height: 100%;
  border-radius: 50%;

  background-color: ${({ type }) => {
    if (type === 'green') return '#74BE4F';
    if (type === 'orange') return '#EB903C';
    if (type === 'yellow') return '#EBCF3C';
    return 'transparent';
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
}

export const selectStyles = (error: boolean, isDropdownOpen: boolean, isDisabled: boolean): ProvidedStyles => ({
  control: (provided, { menuIsOpen }) => ({
    ...provided,
    border: `1px solid ${error ? 'red' : menuIsOpen ? '#939393 !important' : '#CECECE'}`,
    boxShadow: 'none',
    borderRadius: '4px',
    padding: '8px',
    cursor: 'pointer',
    backgroundColor: isDisabled ? 'white' : 'white',
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
});
