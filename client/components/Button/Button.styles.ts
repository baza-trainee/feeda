import { css } from '@emotion/react';
import { theme } from 'styles/theme';

export const buttonStyle = css`
	padding: 16px 24px;
	font-weight: 700;
	font-size: 22px;
	text-align: center;
	border-radius: 4px;
	color: ${theme.colors.mainTitle};
	background-color: ${theme.colors.mainText};
	border: none;

	&:disabled {
		color: ${theme.colors.disabledBtnText};
		background-color: ${theme.colors.disabledBtnBg};
	}

	&:active {
		background-color: ${theme.colors.mainAccent};
		color: ${theme.colors.mainText};
	}

	&:hover {
		background-color: ${theme.colors.mainText};
		border: 1px solid ${theme.colors.mainAccent};
		color: ${theme.colors.mainAccent};
	}
`;
