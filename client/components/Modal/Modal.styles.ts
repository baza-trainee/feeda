import styled from '@emotion/styled';
import { theme } from 'styles/theme';
const { media } = theme;

export const Overplay = styled.div`
	position: fixed;
	z-index: 10;
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	top: 0;
	left: 0;
`;

export const Background = styled.div`
	width: 100vw;
	height: 100%;
	background-color: white;
`;

export const Content = styled.div`
	position: absolute;
	display: flex;
	align-items: center;
	flex-direction: column;
	gap: 32px;

	padding: 90px 29px 70px;
	margin: 0 auto;

	border-radius: 4px;
	max-height: 100vh;
	max-width: 617px;
	width: 100%;

	#terms,
	#agreement {
		margin-bottom: 16px;
	}

	@media screen and (${media.tablet}) {
		padding-top: 112px;
		padding-bottom: 134px;
	}

	@media screen and (${media.desktop}) {
		padding-top: 128px;
		padding-bottom: 113px;
		max-width: 829px;
		#terms,
		#agreement {
			margin-bottom: 48px;
		}
	}
`;

export const Agreement = styled.p`
	display: flex;
	width: 100%;
	font-size: 18px;

	@media screen and (max-width: 767px) {
		overflow-y: scroll;
		padding-right: 24px;

		&::-webkit-scrollbar {
			width: 8px;
		}

		&::-webkit-scrollbar-thumb {
			border-radius: 12px;
			background: #cecece;
		}
	}

	@media screen and (${media.tablet}) and (max-width: 1279px) {
		font-size: 14px;
	}
`;

export const TermsWrapper = styled.div`
	overflow-y: scroll;
	padding-right: 1.5rem;

	&::-webkit-scrollbar {
		width: 8px;
	}

	&::-webkit-scrollbar-thumb {
		border-radius: 12px;
		background: #cecece;
	}

	@media screen and (${media.tablet}) {
		padding-right: 2rem;
	}
`;

export const TermsList = styled.ol`
	font-size: 14px;
	text-align: left;
	list-style: decimal;
	list-style-type: decimal;
	& li {
		list-style-position: inside;
	}

	@media screen and (${media.desktop}) {
		line-height: 1.4;
		letter-spacing: 0.25px;
	}
`;
