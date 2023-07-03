import styled from '@emotion/styled';

export const CheckboxWrapper = styled.div`
	/* display: flex;
	align-items: center; */

	label {
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
		position: absolute;
	}

	label::before {
		content: '';
		border: 2px solid black;
		width: 21px;
		height: 18px;
		margin-right: 15px;
		border-radius: 2px;
	}
	input:checked + label::before {
		content: '';
		background-color: #2196f3;
		border-color: red;
		border-radius: 4px;
	}
`;
