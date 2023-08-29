import { css } from '@emotion/react';
import { theme } from 'styles/theme';
const { colors, fonts, media } = theme;

export const titleStyle = css`
	font-weight: ${fonts.mainTitle.fontWeight.tablet};
	font-size: ${fonts.mainTitle.fontSize.mobile}rem;
	line-height: normal;
	text-align: center;
	color: ${colors.grey1000};

	@media screen and (${media.tablet}) {
		font-size: ${fonts.mainTitle.fontSize.tablet}rem;
		line-height: ${fonts.mainTitle.lineHeight.tablet};
	}

	@media screen and (${media.desktop}) {
		font-size: ${fonts.mainTitle.fontSize.desktop}rem;
		line-height: ${fonts.mainTitle.lineHeight.desktop};
	}
`;

export const mobileStyle = css`
	font-weight: ${fonts.mainTitle.fontWeight.mobile};
	font-size: ${fonts.mainTitle.fontSize.secondary}rem;
	line-height: ${fonts.mainTitle.lineHeight.secondary};
`;

export const marginFinish = css`
	margin-bottom: 2rem;
	@media screen and (${media.tablet}) and (max-width: 1279px) {
		margin-bottom: 1.5rem;
	}
`;

export const marginApplication = css`
	margin-bottom: 2rem;
`;
