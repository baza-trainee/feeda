import styled from '@emotion/styled';

export const Wrapper = styled.div`
	position: relative;
	font-size: 12px;
	padding: 16px 0 16px 48px;
	@media screen and (min-width: 768px) {
		padding: 14px 0 14px 48px;
		font-size: 14px;
		line-height: 150%;
	}
`;

export const CheckboxLabel = styled.label``;

export const Input = styled.input`
	cursor: pointer;
	opacity: 0;
	position: absolute;
	width: 18px;
	height: 18px;

	&:checked + #box::before {
		border: none;
		background-color: #ffbd00;
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
		border: 2px solid #232323;
		border-radius: 2px;
		width: 18px;
		height: 18px;
		cursor: pointer;
	}
	@media screen and (min-width: 768px) {
		top: 0;
	}
`;

export const Span = styled.span`
	text-decoration: underline;
	color: #0029ff;
	cursor: pointer;
`;
