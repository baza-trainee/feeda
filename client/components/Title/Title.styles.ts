import { css } from '@emotion/react';
import { theme } from 'styles/theme';

export const titleStyle = css`
	font-weight: 700;
	font-size: 22px;
	line-height: ${theme.fonts.headline.lineHeight};
	text-align: center;
	color: ${theme.colors.mainBtnText};

	@media screen and (${theme.media.tablet}) {
		font-size: 36px;
	}

	@media screen and (${theme.media.desktop}) {
		font-size: 45px;
	}
`;
