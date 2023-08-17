/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const NewPassFormCss = css`
	padding: 32px;
	width: 335px;
	box-sizing: border-box;
	border-radius: 16px;
	border: 1px solid #cecece;
	display: flex;
	flex-direction: column;
	gap: 32px;

	@media (min-width: 768px) {
		width: 464px;
	}
	@media (min-width: 1200px) {
		width: 456px;
	}
`;

export const ContainerCss = css`
	height: 96px;
`;

export const TitleCss = css`
	width: 328px;
	@media (min-width: 768px) {
		width: 395px;
	}
`;
