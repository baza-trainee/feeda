import styled from '@emotion/styled';
import { theme } from 'styles/theme';
const { media, colors, fonts } = theme;

const scroll = `
overflow-y: scroll;
padding-right: 1.5rem;

&::-webkit-scrollbar {
	width: 0.5rem;
}

&::-webkit-scrollbar-thumb {
	border-radius: 0.75rem;
	background: ${colors.grey200};
}
`;

export const Overplay = styled.div<{ visible: boolean }>`
	overflow-y: auto;
	position: fixed;
	z-index: 10;
	width: 100vw;
	height: 100vh;
	top: 0;
	left: 0;
	background-color: ${colors.mainBg};
`;

export const Content = styled.div<{ agreement: boolean }>`
	line-height: ${fonts.body.lineHeight.tablet};
	letter-spacing: ${fonts.modal.letterSpacing}px;
	display: flex;
	align-items: center;
	flex-direction: column;
	${({ agreement }) =>
		agreement
			? `
          @media screen and (${media.mobile}) {
          	max-height: 100vh;
          }
        `
			: 'max-height: 100vh;'}
	max-width: 38.5rem;
	margin: 0 auto;
	gap: 2rem;
	padding: 5.625rem 1.82rem 4.375rem;

	@media screen and (${media.tablet}) {
		padding-top: 7rem;
		padding-bottom: 8.375rem;
	}

	@media screen and (${media.desktop}) {
		padding-top: 8rem;
		padding-bottom: 7rem;
	}
`;

export const Agreement = styled.p`
	width: 100%;
	font-size: ${fonts.modal.fontSize.mobile}rem;
	padding-right: 0;
	margin-bottom: 1.875rem;

	@media screen and (${media.mobile}) {
		${scroll}
	}

	@media screen and (${media.tablet}) and (max-width: 1279px) {
		font-size: ${fonts.modal.fontSize.tablet}rem;
		margin-bottom: 3rem;
	}
`;

export const TermsWrapper = styled.div`
	font-size: ${fonts.modal.fontSize.tablet}rem;
	color: ${colors.mainText};
	${scroll}
	@media screen and (${media.tablet}) {
		padding-right: 2rem;
	}
`;

export const TermsList = styled.ol`
	text-align: left;
	list-style: decimal;
	list-style-type: decimal;
	& li {
		list-style-position: inside;
	}
`;
