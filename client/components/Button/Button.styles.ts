import styled from '@emotion/styled';
import { media, theme } from 'styles/theme';

export const Btn = styled.button<{ isPressed: boolean; disabled: boolean }>`
	display: block;
	padding: 16px 24px;
	margin: 0 auto;
	font-weight: 700;
	font-size: 22px;
	border-radius: 4px;
	color: ${theme.colors.mainBtnText};
	background-color: ${theme.colors.mainText};
	border: 1px solid ${theme.colors.mainText};
	cursor: pointer;

	&:disabled {
		color: #939393;
		background-color: #cecece;
		border: 1px solid #cecece;
	}

	&:active {
		background-color: ${theme.colors.mainAccent};
		color: ${theme.colors.mainText};
		${({ disabled }) =>
			disabled &&
			' background-color: #cecece; !important; border: 1px solid #cecece !important; color: #939393 !important;'}
	}

	&:not(:disabled):hover,
	:not(:disabled):focus {
		background-color: ${theme.colors.mainText};
		border: 1px solid ${theme.colors.mainAccent};
		color: ${theme.colors.mainAccent};
	}
	${({ isPressed }) =>
		isPressed
			? ' background-color: #ffbd00 !important; border: 1px solid #ffbd00 !important; color: #232323 !important;'
			: ''}

	transition: all 250ms ease-in;
`;

export const CloseBtn = styled.div`
	position: absolute;
	top: 29px;
	right: 29px;
	cursor: pointer;

	@media screen and (${media.tablet}) {
		top: 32px;
		right: 32px;
	}

	@media screen and (${media.desktop}) {
		top: 40px;
		right: 40px;
	}
`;
