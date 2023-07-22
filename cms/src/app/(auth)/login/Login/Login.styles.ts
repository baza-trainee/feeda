/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const FormCss = css`
	padding: 32px;
	box-sizing: border-box;
	width: 335px;
	border-radius: 16px;
	border: 1px solid #cecece;

	@media (min-width: 768px) {
		width: 464px;
	}
	@media (min-width: 1200px) {
		width: 456px;
	}
`;

export const TitleCss = css`
	color: #121212;
	text-align: center;
	font-size: 32px;
	font-style: normal;
	font-weight: 700;
	line-height: 115.556%;

	@media (min-width: 768px) {
		font-size: 45px;
	}
`;
