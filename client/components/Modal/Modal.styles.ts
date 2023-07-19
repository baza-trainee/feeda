import styled from '@emotion/styled';
import { theme } from 'styles/theme';
const { media } = theme;

export const Overplay = styled.div`
	position: fixed;
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	top: 0;
`;

export const Background = styled.div`
	position: absolute;
	width: 100vw;
	height: 100%;
	z-index: -1;
	background-color: white;
	left: 0;
`;

export const Content = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	gap: 32px;

	padding: 90px 29px 70px;
	margin: 0 auto;

	border-radius: 4px;
	max-height: 100vh;
	max-width: 617px;

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

export const Header = styled.h2`
	font-size: 22px;
	font-weight: 700;
	text-align: center;
	line-height: normal;

	@media screen and (${media.tablet}) {
		font-size: 36px;
		line-height: 44px;
	}

	@media screen and (${media.desktop}) {
		font-size: 42px;
		line-height: 52px;
		max-width: 800px;
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

export const AcceptBtn = styled.button`
	background-color: black;
	color: #fcfcfc;

	font-size: 22px;
	font-weight: 700;

	cursor: pointer;
	padding: 16px 24px;
	border-radius: 4px;
`;

export const CloseDiv = styled.div`
	position: absolute;
	top: 29px;
	right: 29px;

	@media screen and (${media.tablet}) {
		top: 32px;
		right: 32px;
	}

	@media screen and (${media.desktop}) {
		top: 40px;
		right: 40px;
	}
`;
