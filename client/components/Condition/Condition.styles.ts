import styled from '@emotion/styled';

export const Wrapper = styled.div`
	display: inline-flex;
	flex-direction: column;
	align-items: center;
	gap: 48px;
	display: flex;
	width: 759px;
	flex-direction: column;
	margin: auto;
`;

export const Detail = styled.p`
	color: #121212;
	text-align: center;
	font-size: 22px;
	line-height: 140%;
	display: flex;
	width: 460px;
	flex-direction: column;
`;

export const Span = styled.span`
	color: #0029ff;
`;

export const UnderSpan = styled.span`
	color: #121212;
	margin-left: 5px;
	font-weight: bold;
`;

export const Button = styled.button`
	display: flex;
	height: 56px;
	padding: 16px 24px;
	align-items: center;
	gap: 16px;
	border-radius: 4px;
	background: var(--neutral-900, #232323);
	color: var(--neutral-100, #fcfcfc);
	text-align: center;
	font-size: 22px;
	font-weight: 700;
	cursor: pointer;
`;

export const Div = styled.div`
	margin-top: 128px;
`;

export const UnderHeader = styled.p`
	display: flex;
	width: 675px;
	/* flex-direction: column; */
	color: var(--neutral-1000, #121212);
	text-align: center;
	font-size: 22px;
	font-family: Exo 2;
	line-height: 140%;
`;
