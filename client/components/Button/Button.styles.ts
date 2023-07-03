import { css } from '@emotion/react';
import { theme } from 'styles/theme';

export const buttonStyle = css`
	width: 100%;
	padding: 15px 34px;
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
`;
