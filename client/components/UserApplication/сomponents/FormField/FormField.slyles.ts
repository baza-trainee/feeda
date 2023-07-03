import { css } from '@emotion/react';
// import { theme } from 'styles/theme';

export const errorInputStyles = css`
	border-color: #df4242;
`;
export const labelStyles = css`
	color: #353535;
	font-size: 16px;
	font-family: Exo 2;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	flex-direction: column;
	display: flex;
	gap: 4px;
`;

export const inputlStyles = css`
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

export const validDiscordStyle = css`
	border: 1px solid #14905d;
`;
