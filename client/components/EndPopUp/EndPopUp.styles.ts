import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { theme } from 'styles/theme';
const { colors, fonts, media } = theme;

export const Wrapper = styled(motion.div)`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	min-height: 100vh;
	padding: 0 1.8rem;
	@media screen and (${media.desktop}) {
		padding: 0;
	}
`;

export const Section = styled(motion.section)`
	font-size: ${fonts.endPopUp.fontSize.mobile}rem;
	line-height: normal;
	letter-spacing: ${fonts.endPopUp.letterSpacing}px;
	text-align: center;

	width: 100%;
	max-width: 20.94rem;
	margin: 0 auto;
	padding: 1.5rem;

	border-radius: 16px;
	border: 1px solid ${colors.grey200};
	color: ${colors.grey1000};

	@media screen and (${media.tablet}) {
		max-width: 29.1rem;
	}
	@media screen and (${media.desktop}) {
		max-width: 37rem;
	}
`;

export const Desc = styled.p`
	margin-bottom: 2rem;
	font-weight: ${fonts.endPopUp.fontWeight.desc};
	@media screen and (${media.tablet}) {
		margin-bottom: 1.5rem;
	}
	@media screen and (${media.desktop}) {
		margin: 0 auto 2rem;
	}
`;

export const Reminder = styled.p`
	font-weight: ${fonts.endPopUp.fontWeight.desc};
	line-height: normal;
	@media screen and (${media.tablet}) {
		font-weight: ${fonts.endPopUp.fontWeight.reminder};
		font-size: ${fonts.endPopUp.fontSize.tablet}rem;
		letter-spacing: normal;
	}
	@media screen and (${media.desktop}) {
		font-size: ${fonts.endPopUp.fontSize.desktop}rem;
		line-height: ${fonts.endPopUp.lineHeight};
		font-weight: ${fonts.endPopUp.fontWeight.desc};
		margin: 0 auto;
	}

	& span {
		color: ${colors.secondaryAccent};
	}
`;

export const Img = styled.img`
	display: inline-block;
	vertical-align: text-bottom;
	width: 16px;
	height: 16px;
	@media screen and (${media.tablet}) {
		width: 24px;
		height: 24px;
	}
	@media screen and (${media.desktop}) {
		width: 32px;
		height: 32px;
	}
`;
