import styled from '@emotion/styled';
import { theme } from 'styles/theme';
const { fonts, media } = theme;

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

export const Agreement = styled.p`
	display: flex;
	width: 100%;
	margin-left: 1px;
`;

export const AgreementInput = styled.textarea`
	width: 100%;
	height: 1.1rem;
	border: none;
	background: transparent;
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

export const ModalOverplay = styled.div`
	background-color: white;

	position: fixed;
	top: 0;
	left: 0;

	width: 100%;
	min-height: 100vh;
	overflow: hidden;
`;

export const ModalContent = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	gap: 64px;

	padding: 90px 29px 70px;
	margin: 0 auto;

	border-radius: 4px;
	max-height: 100vh;
	max-width: 617px;

	@media screen and (${media.tablet}) {
		padding-top: 112px;
		padding-bottom: 134px;
	}

	@media screen and (${media.desktop}) {
		padding-top: 128px;
		padding-bottom: 113px;
		max-width: 829px;
	}
`;
