import { css } from '@emotion/react';
import { theme } from 'styles/theme';

export const buttonStyle = css`
	padding: 16px 24px;
	font-weight: 700;
	font-size: 22px;
	text-align: center;
	border-radius: 4px;
	color: ${theme.colors.mainBtnText};
	background-color: ${theme.colors.mainText};
	border: 1px solid transparent;

	&:disabled {
		color: ${theme.colors.mainPlaceholder};
		background-color: ${theme.colors.disabledBtnBg};
	}

	&:active {
		background-color: ${theme.colors.mainAccent};
		color: ${theme.colors.mainText};
	}

	&:not(:disabled):hover {
		background-color: ${theme.colors.mainText};
		border: 1px solid ${theme.colors.mainAccent};
		color: ${theme.colors.mainAccent};
	}
`;
