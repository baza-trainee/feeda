/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const RecoverFormCss = css`
	width: 335px;
	box-sizing: border-box;
	padding: 32px;
	border-radius: 16px;
	border: 1px solid #cecece;

	@media (min-width: 768px) {
		width: 464px;
	}
	@media (min-width: 1200px) {
		width: 456px;
	}
`;

export const HeaderCss = css`
	margin-bottom: 24px;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 16px;
`;

export const TitleCss = css`
	margin: 0;
	color: #121212;
	width: 100%;
	text-align: center;
	font-size: 32px;
	font-style: normal;
	font-weight: 700;
	line-height: 115.556%;

	@media (min-width: 768px) {
		font-size: 45px;
	}
`;

export const SubtitleCss = css`
	padding: 0;
	margin: 0;
	width: 75.6%;
	color: #464646;
	text-align: center;
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	@media (min-width: 768px) {
		font-size: 16px;
	}
`;
