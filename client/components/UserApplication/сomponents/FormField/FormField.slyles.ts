import { css } from '@emotion/react';

export const errorInputStyles = css`
	border-color: #df4242;
	line-height: 16px;
	letter-spacing: 0.5px;
`;

export const errorStyles = css`
	font-size: 12px;
	color: rgb(223, 66, 66);
	position: absolute;
`;
export const labelStyles = css`
	color: #353535;
	font-size: 16px;
	flex-direction: column;
	display: flex;
	gap: 4px;
	line-height: normal;
`;

export const inputlStyles = css`
	padding: 16px;
	border: 1px solid #cecece;
	background-color: #fcfcfc;
	border-radius: 4px;

	&:focus {
		border-color: #939393;
	}
	&::placeholder {
		color: #939393;
		font-size: 16px;
		font-weight: 400;
	}
	&:focus::placeholder {
		color: transparent;
	}
`;

export const validDiscordStyle = css`
	border-color: #14905d !important;
`;
export const validDiscordNameStyle = css`
	color: #14905d !important;
`;
export const vaidDiscordUnderText = css`
	line-height: 16px;
	letter-spacing: 0.5px;
	color: #14905d;
	font-size: 12px;
	position: absolute;
`;
