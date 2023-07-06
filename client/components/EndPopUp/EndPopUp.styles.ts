import styled from '@emotion/styled';
import { theme } from 'styles/theme';
const { colors, fonts, media } = theme;
const { endPopUpText } = fonts;
const { fontWeight, fontSize, letterSpacing, lineHeight } = endPopUpText;

export const Section = styled.section`
	position: fixed;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);

	font-weight: ${fontWeight};
	font-size: ${fontSize.mobile}rem;
	letter-spacing: ${letterSpacing.mobile};
	line-height: ${lineHeight.mobile};

	text-align: center;
	margin: 0 auto;
	padding: 24px;

	border-radius: 16px;
	border: 1px solid ${colors.grey200};
`;

export const Desc = styled.p`
	color: ${colors.grey1000};

	margin-bottom: 32px;

	letter-spacing: ${letterSpacing.tablet};
`;

export const Reminder = styled.h2`
	color: ${colors.grey1000};
	width: 464px;

	@media screen and (${media.tablet}) {
		font-size: ${fontSize.tablet}rem;
		letter-spacing: ${letterSpacing.tablet};
	}

	@media screen and (${media.desktop}) {
		font-size: ${fontSize.desktop}rem;
		line-height: ${lineHeight.desktop};
	}
`;

export const Span = styled.span`
	color: ${colors.secondaryAccent};
`;
