import styled from '@emotion/styled';

import { colors, fonts, media } from '~styles/theme';
const { mainTitle } = fonts;
const { fontWeight, fontSize, lineHeight } = mainTitle;

export const Heading = styled.h2<{ secondary: boolean | undefined }>`
	text-align: center;

	font-weight: ${fontWeight};
	font-size: ${({ secondary }) => (secondary ? fontSize.secondary : fontSize.mobile)}rem;
	line-height: ${({ secondary }) => (secondary ? lineHeight.secondary : lineHeight.mobile)};

	color: ${colors.grey1000};

	@media screen and (${media.tablet}) {
		font-size: ${fontSize.tablet}rem;
		line-height: ${lineHeight.tablet};
	}

	@media screen and (${media.desktop}) {
		font-size: ${fontSize.desktop}rem;
		line-height: ${lineHeight.desktop};
	}
`;
