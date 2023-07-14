import { css } from '@emotion/react';
import { theme } from 'styles/theme';

export const formStyle = css`
	padding: 32px;
	/* width: 100%; */
	display: flex;
	flex-direction: column;
	gap: 28px;
	@media screen and (min-width: 768px) {
		padding: 32px;
	}
	@media screen and (min-width: 1280px) {
		padding: 32px;
	}
`;

export const formWrapperStyle = css`
	margin: 0 auto;
	width: 335px;
	border: 1px solid ${theme.colors.disabledBtnBg};
	border-radius: 16px;
	@media screen and (min-width: 768px) {
		width: 464px;
	}
	@media screen and (min-width: 1280px) {
		width: 456px;
	}
`;
export const formTitle = css`
	font-size: 32px;
	font-weight: 600;
	line-height: 44px;
	text-align: center;
	@media screen and (min-width: 768px) {
		font-size: 36px;
		line-height: 44px;
	}
	@media screen and (min-width: 1280px) {
		font-size: 45px;
		line-height: 52px;
	}
`;
