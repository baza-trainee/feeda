import { css } from '@emotion/react';
import { theme } from 'styles/theme';

export const formStyle = css`
	font-family: ${theme.fonts.label.fontFamily};
	padding: 31px;
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 28px;
	@media screen and (min-width: 768px) {
		padding: 36px;
	}
	@media screen and (min-width: 1024px) {
		padding: 32px;
	}
`;

export const formWrapperStyle = css`
	margin: 80px auto auto auto;
	padding: 0;
	width: 335px;

	border: 1px solid ${theme.colors.disabledBtnBg};
	border-radius: 16px;
	@media screen and (min-width: 768px) {
		width: 464px;
	}
	@media screen and (min-width: 1024px) {
		width: 456px;
	}
`;
export const formTitle = css`
	font-size: 32px;
	font-style: normal;
	font-weight: 600;
	line-height: 40px;
	display: block;
	text-align: center;
	margin: auto;
	@media screen and (min-width: 768px) {
		font-size: 36px;
	}
	@media screen and (min-width: 1024px) {
		font-size: 45px;
	}
`;
