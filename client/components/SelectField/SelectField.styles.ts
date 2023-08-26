import { StylesConfig } from 'react-select';

import styled from '@emotion/styled';
import { colors, fonts } from 'styles/theme';

export const Label = styled.label`
	color: ${colors.inputLabel};
	font-size: 16px;
	flex-direction: column;
	display: flex;
	gap: 0.25rem;
	line-height: normal;
`;

export const ErrorText = styled.p`
	color: ${colors.error};
	font-size: ${fonts.body.fontSize.mobile}rem;
	letter-spacing: ${fonts.formField.letterSpacing}px;
	position: absolute;
	bottom: -1.25rem;
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
		border: `1px solid ${error ? colors.error : menuIsOpen ? colors.grey400 + ' !important' : colors.grey200}`,
		boxShadow: 'none',
		borderRadius: '4px',
		padding: '16px',
		cursor: 'pointer',
		':hover': {
			borderColor: `${error ? colors.error : colors.grey200}`,
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
		color: colors.grey400,
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
		backgroundColor: colors.grey100,
		borderRadius: '4px',
		margin: '4px 0 0 0 ',
	}),
	option: (provided, state) => ({
		...provided,
		backgroundColor: state.isFocused ? colors.inputSelectHover : colors.grey100,
		color: colors.mainText,
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
			color: colors.grey100,
			backgroundColor: colors.mainText,
		},
	}),
});
