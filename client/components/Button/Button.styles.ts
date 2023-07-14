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
	border: 1px solid ${theme.colors.mainText};

	&:disabled {
		color: #939393;
		background-color: #cecece;
		border: 1px solid #cecece;
	}
	&:not(:disabled):hover {
		color: #ffbd00;
		border: 1px solid #ffbd00;
	}
`;

export const onClickButtonStyle = css`
	background-color: #ffbd00;
	border: 1px solid #ffbd00 !important;
	color: #232323 !important;
`;