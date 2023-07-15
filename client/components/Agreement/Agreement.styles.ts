import styled from '@emotion/styled';
import { theme } from 'styles/theme';
const { fonts, media } = theme;

export const Header = styled.h2`
	font-weight: ${fonts.display.fontWeight};
	text-align: center;
	font-size: 22px;
	max-width: 277px;
	line-height: normal;
	margin-top: 70px;

	@media screen and (${media.tablet}) {
		font-size: 36px;
		line-height: 44px;
	}

	@media screen and (${media.desktop}) {
		font-size: 42px;
		line-height: 52px;
		max-width: 800px;
		margin-top: 100px;
	}
`;

export const Container = styled.div`
	padding-right: 24px;
	font-size: ${fonts.title.fontSize.mobile}px;
	line-height: ${fonts.label.lineHeight.mobile};
	overflow-y: scroll;
	text-align: left;
	margin: 0;
	max-width: 585px;

	@media screen and (${media.tablet}) {
		font-size: ${fonts.title.fontSize.tablet};
	}

	@media screen and (${media.desktop}) {
		font-size: 18px;
		line-height: ${fonts.title.lineHeight};
		letter-spacing: 0.25px;
	}

	&::-webkit-scrollbar {
		width: 8px;
		height: 7px;
	}

	&::-webkit-scrollbar-thumb {
		border-radius: 12px;
		background: var(--neutral-200, #cecece);
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

export const InfoP = styled.p`
	margin-bottom: 15px;

	@media screen and (${media.desktop}) {
		margin-bottom: 10px;
	}
`;

export const CloseDiv = styled.div`
	position: absolute;
	top: 40px;
	right: 40px;
`;

export const ModalOverplay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	min-height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;
`;

export const ModalContent = styled.div`
	background-color: white;

	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 64px;

	padding: 30px;
	border-radius: 4px;
	max-width: 900px;
	max-height: 100vh;

	@media screen and (${media.desktop}) {
		max-width: 829px;
	}
`;
