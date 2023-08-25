import styled from '@emotion/styled';

import { theme } from '~styles/theme';
const { colors, fonts, media } = theme;

export const Wrapper = styled.div`
	position: relative;
	font-size: ${fonts.checkbox.fontSize.mobile}rem;
	line-height: ${fonts.checkbox.lineHeight.mobile};
	letter-spacing: ${fonts.checkbox.letterSpacing}px;
	padding: 1rem 0 1rem 3rem;
	@media screen and (${media.tablet}) {
		padding: 0.875rem 0 0.875rem 3rem;
		font-size: ${fonts.checkbox.fontSize.tablet}rem;
		line-height: normal;
	}
	@media screen and (${media.desktop}) {
		padding: 0.875rem 0 0.875rem 3rem;
		line-height: ${fonts.checkbox.lineHeight.desktop};
	}
`;

export const Input = styled.input`
	cursor: pointer;
	opacity: 0;
	position: absolute;
	width: 18px;
	height: 18px;

	&:checked + #box::before {
		border: none;
		background-color: ${colors.accent};
		background-image: url('/check_small.svg');
		background-position: center center;
	}
`;

export const Box = styled.div`
	padding: 15px;
	position: absolute;
	top: 8px;
	left: 0;

	&::before {
		display: block;
		content: '';
		border: 2px solid ${colors.mainText};
		border-radius: 2px;
		width: 18px;
		height: 18px;
		cursor: pointer;

		transition: all 350ms ease-in-out;
	}

	&:hover {
		border-radius: 50%;
		background-color: ${colors.hoverBox};
	}

	input:checked + &:hover {
		border-radius: 50%;
		background-color: ${colors.hoverBoxChecked};
	}

	@media screen and (${media.tablet}) {
		top: 0;
	}
	transition: all 350ms ease-in;
`;

export const Span = styled.span`
	text-decoration: underline;
	color: ${colors.link};
	cursor: pointer;
`;
