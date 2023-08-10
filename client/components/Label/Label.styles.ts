/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { theme } from 'styles/theme';

export const LabelCss = {
	error: css`
		color: ${theme.colors.error};
	`,
	success: css`
		color: #14905d;
	`,
	default: css`
		color: ${theme.colors.mainLabel};
	`,
};
