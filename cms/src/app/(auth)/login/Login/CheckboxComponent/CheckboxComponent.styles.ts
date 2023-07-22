/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';

export const Container = styled.div`
	margin-top: 17px;
	margin-bottom: 32px;
	display: flex;
	align-items: center;
`;

export const LabelText = styled.span`
	padding: 4px;
	color: #353535;
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	letter-spacing: 0.1px;
	user-select: none;
`;

export const CheckboxContainer = styled.div`
	display: flex;
`;

export const ElementsContainer = styled.div`
	padding-left: 11px;
	display: flex;
	align-items: center;
	column-gap: 24px;
`;

export const LabelElement = styled.label`
	display: flex;
	align-items: center;
	gap: 11px;
	cursor: pointer;
`;

export const InputElement = styled.input`
	display: grid;
	width: 18px;
	height: 18px;
	margin: 0;
	border: 2px solid #232323;
	border-radius: 4px;
	color: black;
	font: inherit;
	cursor: pointer;
	background-color: none;
	-webkit-appearance: none;
	appearance: none;
	place-content: center;

	&:checked {
		border-color: transparent;
		background-color: #ffbd00;
	}

	&::before {
		width: 15px;
		height: 15px;
		border-radius: 2px;
		content: '';
		background-color: white;
		transition: 200ms transform ease-in-out;
		transform: scale(0);
		clip-path: polygon(11% 55%, 19% 48%, 41% 70%, 79% 15%, 88% 22%, 43% 88%);
	}

	&:checked::before {
		transform: scale(1);
	}
`;
