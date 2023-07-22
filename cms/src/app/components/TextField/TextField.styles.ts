/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const DefaultInputStyle = css`
	padding: 16px;
	border-radius: 4px;
	outline: 1px solid #939393;

	&:focus {
		border: 1px solid #939393;
	}
	&:disabled {
		border: 1px solid #cecece;
	}
`;

export const InputStyle = {
	error: css`
		border: 1px solid #dc0c31;
	`,
	success: css`
		border: 1px solid #14905d;
	`,
	default: css`
		border: 1px solid #cecece;
	`,
};
