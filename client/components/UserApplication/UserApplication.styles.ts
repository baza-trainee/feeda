import styled from '@emotion/styled';
import { theme } from 'styles/theme';

export const FormWrapper = styled.div`
	margin: 0 auto;
	width: 335px;
	border: 1px solid ${theme.colors.disabledBtnBg};
	border-radius: 16px;
	@media screen and (min-width: 768px) {
		width: 464px;
	}
	@media screen and (min-width: 1280px) {
		width: 456px;
	}
`;

export const Form = styled.form`
	padding: 32px;
`;

export const FormTitle = styled.h1`
	margin-bottom: 32px;
	font-size: 32px;
	font-weight: 600;
	line-height: 44px;
	text-align: center;
	@media screen and (min-width: 768px) {
		font-size: 36px;
		line-height: 44px;
	}
	@media screen and (min-width: 1280px) {
		font-size: 45px;
		line-height: 52px;
	}
`;

export const CheckWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
	margin-bottom: 40px;
	@media screen and (min-width: 768px) {
		gap: 31px;
		margin-bottom: 47px;
	}
	@media screen and (min-width: 1280px) {
		gap: 27px;
		margin-bottom: 45px;
	}
`;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 28px;
`;

export const InputsWrapper = styled(Wrapper)`
	margin-bottom: 28px;
`;

export const SelectWrapper = styled(Wrapper)`
	margin-bottom: 44px;

	@media screen and (min-width: 768px) {
		margin-bottom: 51px;
	}
`;
