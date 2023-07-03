import { css } from '@emotion/react';
import { theme } from 'styles/theme';

export const formStyle = css`
	padding: 32px;
	width: 335px;
`;

export const formWrapperStyle = css`
	margin: 80px auto auto auto;
	padding: 0;
	width: 335px;
	border: 1px solid ${theme.colors.disabledBtnBg};
	border-radius: 16px;
`;
export const formTitle = css`
	font-size: 32px;
	font-style: normal;
	font-weight: 600;
	line-height: 40px;
	display: inline-block;
	text-align: center;
	margin: auto;
`;
