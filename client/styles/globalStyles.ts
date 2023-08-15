'use client';
import { css } from '@emotion/react';

import { animations } from './animations';
import { reset } from './reset';
import { theme } from './theme';
const { fonts, colors, media } = theme;

const common = css`
	html,
	body {
		font-style: normal;
	}
	body {
		font-size: ${fonts.body.fontSize.mobile}rem;
		font-weight: ${fonts.body.fontWeight};
		line-height: ${fonts.body.lineHeight.mobile};
		letter-spacing: ${fonts.body.letterSpacing.mobile}px;
		color: ${colors.mainText};
		@media screen and (${media.tablet}) {
			font-size: ${fonts.body.fontSize.tablet}rem;
			line-height: ${fonts.body.lineHeight.tablet};
			letter-spacing: ${fonts.body.letterSpacing.tablet}px;
		}
		@media screen and (${media.desktop}) {
			font-size: ${fonts.body.fontSize.desktop}rem;
		}
	}
`;

export const globalStyles = css`
	${animations}
	${common}
    ${reset}
`;
