import styled from '@emotion/styled';

import { theme } from '~styles/theme';

export const Wrapper = styled.div`
	position: relative;
	font-size: ${theme.fonts.checkbox.fontSize.mobile}rem;
	line-height: ${theme.fonts.checkbox.lineHeight.mobile};
	letter-spacing: ${theme.fonts.checkbox.letterSpacing}px;
	padding: 1rem 0 1rem 3rem;
	@media screen and (${theme.media.tablet}) {
		padding: 0.875rem 0 0.875rem 3rem;
		font-size: ${theme.fonts.checkbox.fontSize.tablet}rem;
		line-height: normal;
	}
	@media screen and (${theme.media.desktop}) {
		padding: 0.875rem 0 0.875rem 3rem;
		line-height: ${theme.fonts.checkbox.lineHeight.desktop};
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
		background-color: ${theme.colors.accent};
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
		border: 2px solid ${theme.colors.mainText};
		border-radius: 2px;
		width: 18px;
		height: 18px;
		cursor: pointer;
	}
	@media screen and (${theme.media.tablet}) {
		top: 0;
	}
`;

export const Span = styled.span`
	text-decoration: underline;
	color: ${theme.colors.link};
	cursor: pointer;
`;
