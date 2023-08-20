import { StylesConfig } from 'react-select';

import styled from '@emotion/styled';
import { theme } from 'styles/theme';
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

export const selectStyles = (error: boolean, isDropdownOpen: boolean): ProvidedStyles => ({
	control: (provided, { menuIsOpen }) => ({
		...provided,
		border: `1px solid ${error ? 'red' : menuIsOpen ? '#939393 !important' : theme.colors.disabledBtnBg}`,
		boxShadow: 'none',
		borderRadius: '4px',
		padding: '16px',
		cursor: 'pointer',
		':hover': {
			borderColor: `${error ? 'red' : theme.colors.disabledBtnBg}`,
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
	option: (provided) => ({
		...provided,
		backgroundColor: '#FCFCFC',
		color: '#232323',
		borderRadius: '4px',
		height: '56px',
		display: 'flex',
		alignItems: 'center',
		padding: '0 16px',
		transition: 'background-color 0.2s',
		':hover': {
			backgroundColor: '#FDF5DD',
		},
		':active': {
			color: '#FCFCFC',
			backgroundColor: '#232323',
		},
	}),
});
