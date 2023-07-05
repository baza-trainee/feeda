import styled from '@emotion/styled';

export const CheckboxContainer = styled.div`
	/* display: flex; */
	label {
		&:hover {
			&::before {
				/* background-color: red; */
			}
		}
		position: relative;
		cursor: pointer;
		font-size: 12px;
		font-weight: 400;
		line-height: 16px;
		letter-spacing: 0.5px;
		display: flex;
		align-items: center;
		gap: 15px;

		@media screen and (min-width: 768px) {
			font-size: 14px;
		}
	}
	input {
		cursor: pointer;
		opacity: 0;
		position: absolute;
		color: white;
		&:checked + label::before {
			content: url('/check.svg');

			background-color: #ffbd00;
			border: 2px solid #ffbd00;
		}
	}

	label::before {
		content: '';
		border: 2px solid black;
		width: 18px;
		height: 18px;

		border-radius: 2px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
`;

export const CheckboxText = styled.p`
	width: 165px;
	@media screen and (min-width: 768px) {
		font-size: 14px;
		width: auto;
	}
`;
