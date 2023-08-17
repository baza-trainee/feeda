import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { theme } from 'styles/theme';
const { colors, media, fonts } = theme;

export const Wrapper = styled(motion.section)`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;

	min-height: 100vh;
	gap: 2rem;
	padding: 0 1rem;

	@media screen and (${media.tablet}) {
		gap: 3rem;
		padding: 0 1.875rem;
	}
`;

export const TextWrapper = styled.div`
	max-width: 20.57rem;
	color: ${colors.grey1000};
	text-align: center;
	line-height: normal;
	letter-spacing: normal;
	font-size: ${fonts.startPopUp.fontSize.mobile}rem;

	@media screen and (${media.tablet}) {
		max-width: 32.88rem;
		line-height: ${fonts.startPopUp.lineHeight};
		font-size: ${fonts.startPopUp.fontSize.tablet}rem;
	}
`;

export const Disc = styled.span`
	font-weight: ${fonts.startPopUp.fontWeight.tablet};
	@media screen and (${media.mobile}) {
		letter-spacing: ${fonts.startPopUp.letterSpacing}px;
		font-weight: ${fonts.startPopUp.fontWeight.mobile};
	}
`;

export const Terms = styled.span`
	color: ${colors.link};
	cursor: pointer;
`;
