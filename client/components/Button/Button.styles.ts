import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { theme } from 'styles/theme';
const { colors, fonts, media } = theme;

export const Btn = styled(motion.button)`
	display: block;
	padding: 1rem 1.5rem;
	margin: 0 auto;
	font-weight: ${fonts.button.fontWeight};
	font-size: ${fonts.button.fontSize}rem;
	border-radius: 4px;
	color: ${colors.grey100};
	background-color: ${colors.mainText};
	border: 1px solid ${colors.mainText};
	cursor: pointer;

	&:active {
		background-color: ${colors.accent};
		color: ${colors.mainText};
	}

	&:disabled {
		color: ${colors.grey400};
		background-color: ${colors.grey200};
		border: 1px solid ${colors.grey200};
	}
`;

export const CloseBtn = styled.div<{ isPressed: boolean }>`
	position: absolute;
	top: 1.875rem;
	right: 1.875rem;
	cursor: pointer;

	${({ isPressed }) =>
		isPressed &&
		`svg {
	rect:first-child {
		fill: ${colors.accent};
	}
	rect:last-child {
		stroke: ${colors.mainText};
	}
	& path {
		fill: ${colors.mainText};
		stroke: ${colors.accent};
	}
}`}

	&:hover,
	&:focus svg {
		rect:first-child {
			fill: ${colors.grey1000};
		}
		rect:last-child {
			stroke: ${colors.accent};
		}
		& path {
			fill: ${colors.accent};
			stroke: ${colors.grey1000};
		}
	}

	@media screen and (${media.tablet}) {
		top: 2rem;
		right: 2rem;
	}

	@media screen and (${media.desktop}) {
		top: 2.5rem;
		right: 2.5rem;
	}

	& path,
	rect {
		transition: all 400ms ease-in-out;
	}
`;
