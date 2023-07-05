import styled from '@emotion/styled';

export const CheckboxContainer = styled.div`
	label {
		&:hover {
			&::before {
				/* background-color: red; */
			}
		}
		cursor: pointer;
		font-size: 12px;
		font-weight: 400;
		line-height: 16px;
		letter-spacing: 0.5px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	input {
		cursor: pointer;
		opacity: 0;
		position: relative;

		&:checked + label::before {
			content: url('/check.svg');
			background-color: #ffbd00;
			border: 2px solid #ffbd00;
			display: block;
			width: 18px;
			height: 18px;
			color: white;
		}
	}

	label::before {
		content: '';
		border: 2px solid black;
		width: 18px;
		height: 18px;
		margin-right: 15px;
		border-radius: 2px;
		display: block;
	}
`;
