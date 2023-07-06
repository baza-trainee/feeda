import styled from '@emotion/styled';

export const CheckboxContainer = styled.div`
	display: flex;

	input {
		cursor: pointer;
		/* appearance: none; */
		opacity: 0;
		position: absolute;
	}
	span {
		display: flex;
		align-items: center;
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
	@media screen and (min-width: 768px) {
		font-size: 14px;
		width: auto;
	}
`;
