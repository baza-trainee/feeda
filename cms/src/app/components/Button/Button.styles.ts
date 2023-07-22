import { css } from '@emotion/react';

export const buttonStyle = css`
	width: 100%;
	padding: 16px 24px;
	font-weight: 700;
	font-size: 22px;
	text-align: center;
	border-radius: 4px;
	color: #fcfcfc;
	background-color: #232323;
	border: none;

	&:disabled {
		color: #939393;
		background-color: #cecece;
	}

	&:hover {
		color: #ffbd00;
		background-color: #232323;
	}

	&:active,
	&:focus {
		color: #ffbd00;
		background-color: #232323;
	}
`;
