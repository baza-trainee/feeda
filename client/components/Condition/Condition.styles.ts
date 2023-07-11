import styled from '@emotion/styled';
import { theme } from 'styles/theme';
const { colors, fonts, media } = theme;

export const Welcome = styled.h2`
	color: ${colors.mainTitle};
	text-align: center;
	font-size: 22px;
	line-height: normal;
	font-weight: ${fonts.title.fontWeight.desktop};

	@media screen and (${media.tablet}) {
		font-size: 36px;
		line-height: 44px;
	}

	@media screen and (${media.desktop}) {
		font-size: 45px;
		line-height: 52px;
	}
`;

export const Detail = styled.p`
	color: ${colors.mainTitle};
	text-align: center;
	line-height: normal;
	font-size: ${fonts.title.fontSize.tablet}px;

	@media screen and (${media.tablet}) {
		max-width: 525px;
		line-height: ${fonts.title.lineHeight};
		font-size: ${fonts.title.fontSize.desktop}px;
	}
`;

export const Span = styled.span`
	color: #0029ff;
`;

export const UnderSpan = styled.span`
	color: ${colors.mainTitle};
	margin-left: 5px;
	font-weight: bold;
`;

export const UnderHeader = styled.p`
	text-align: center;
	line-height: normal;
	font-size: ${fonts.title.fontSize.tablet}px;

	@media screen and (${media.tablet}) {
		line-height: ${fonts.title.lineHeight};
		font-size: ${fonts.title.fontSize.desktop}px;
	}
`;
