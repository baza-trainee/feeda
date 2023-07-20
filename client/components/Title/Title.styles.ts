import { css } from '@emotion/react';
import { theme } from 'styles/theme';

export const titleStyle = css`
	font-weight: 700;
	font-size: 22px;
	line-height: normal;
	text-align: center;
	color: ${theme.colors.mainTitle};

	@media screen and (${theme.media.tablet}) {
		font-size: 36px;
		line-height: 44px;
	}

	@media screen and (${theme.media.desktop}) {
		font-size: 45px;
		line-height: 52px;
	}
`;

export const mobileStyle = css`
	font-weight: 600;
	font-size: 32px;
	line-height: 40px;
`;

export const marginFinish = css`
	margin-bottom: 32px;
	@media screen and (min-width: 768px) and (max-width: 1279px) {
		margin-bottom: 24px;
	}
`;

export const marginApplication = css`
	margin-bottom: 32px;
`;
