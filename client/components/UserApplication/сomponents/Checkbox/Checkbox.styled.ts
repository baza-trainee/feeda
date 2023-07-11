import styled from '@emotion/styled';
import Link from 'next/link';

export const AcceptLink = styled(Link)`
	color: #0029ff;
`;
export const CheckboxLabel = styled.label`
	display: flex;
	align-items: center;

	input {
		cursor: pointer;
		opacity: 0;
		position: absolute;
		width: 18px;
		height: 18px;
	}
	span {
		margin-right: 15px;
		border: 2px solid #232323;
		border-radius: 2px;
		width: 18px;
		height: 18px;
		cursor: pointer;
	}

	input:checked + span {
		border: none;
		background-color: #ffbd00;
		background-image: url('/check_small.svg');
		background-position: center center;
	}
`;

export const CheckboxText = styled.p`
	width: 165px;
	font-size: 12px;
	@media screen and (min-width: 768px) {
		font-size: 14px;
		width: auto;
	}
`;
