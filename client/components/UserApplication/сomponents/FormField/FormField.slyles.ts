import { css } from '@emotion/react';
import { theme } from 'styles/theme';

export const labelStyles = css`
	/* display:inline-block; */
	/* font-family: ${theme.fonts.label.fontFamily}; */
	color: #353535;
	/* Body/Large */

	font-size: 16px;
	font-family: Exo 2;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	flex-direction: column;
	display: flex;
	gap: 4px;
	/* margin-bottom: 28px; */
	/* color: red; */
`;

export const inputlStyles = css`
	/* display: block;s */
	width: 271px;
	padding: 16px;
	margin: 0;
	border: 1px solid #cecece;
	background-color: #fcfcfc;
	border-radius: 4px;
	&::placeholder {
		color: #939393;
		font-size: 16px;
		font-weight: 400;
	}
`;
