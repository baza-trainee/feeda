/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { colors } from 'styles/theme';
const { error, validInput, inputLabel } = colors;

export const LabelCss = {
	error: css`
		color: ${error};
	`,
	success: css`
		color: ${validInput};
	`,
	default: css`
		color: ${inputLabel};
	`,
};
