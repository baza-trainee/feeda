/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const FormCss = css`
	padding: 32px;
	box-sizing: border-box;
	width: 335px;
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

export const TitleCss = css`
	text-align: center;
`;

export const ContainerCss = css`
	height: 196px;
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

export const InputCss = css`
	height: 96px;
`;
