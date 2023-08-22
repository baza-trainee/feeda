import { css } from '@emotion/react';
import { theme } from 'styles/theme';
const { colors, fonts } = theme;

export const labelStyles = css`
	color: ${colors.inputLabel};
	flex-direction: column-reverse;
	display: flex;
	gap: 0.25rem;
	line-height: normal;
	letter-spacing: normal;
	position: relative;
`;

export const inputlStyles = css`
	color: ${colors.mainText};
	padding: 1rem;
	border: 1px solid ${colors.grey200};
	background-color: ${colors.grey100};
	border-radius: 4px;

	&:focus {
		border-color: ${colors.grey400};
	}
	&::placeholder {
		color: ${colors.grey400};
		font-size: ${fonts.formField.fontSize.input}rem;
	}
	&:focus::placeholder {
		color: transparent;
	}
	&:focus ~ p[data-category='label-text'] {
		color: inherit;
	}
	&:focus ~ p[data-category='noerrors'] {
		display: none;
	}
`;

export const errorInputStyles = css`
	border-color: ${colors.error};
`;

export const errorStyles = css`
	color: ${colors.error};
`;

export const validation = css`
	font-size: ${fonts.formField.fontSize.validation}rem;
	position: absolute;
	bottom: -1.25rem;
`;

export const validDiscordStyle = css`
	border-color: ${colors.validInput};
`;

export const validDiscordNameStyle = css`
	color: ${colors.validInput};
`;

export const validDiscordUnderText = css`
	letter-spacing: ${fonts.formField.letterSpacing}px;
	color: ${colors.validInput};
`;
