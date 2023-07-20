import styled from '@emotion/styled';
import { theme } from 'styles/theme';

export const FormWrapper = styled.div`
	padding: 80px 0 124px 0;
	@media screen and (min-width: 768px) {
	}
	@media screen and (min-width: 1280px) {
		padding: 128px 0 111px 0;
	}
`;

export const Form = styled.form`
	margin: 0 auto;
	padding: 32px;
	width: 100%;
	max-width: 335px;
	border: 1px solid ${theme.colors.disabledBtnBg};
	border-radius: 16px;
	@media screen and (min-width: 768px) {
		max-width: 464px;
	}
	@media screen and (min-width: 1280px) {
		max-width: 456px;
	}
`;

export const CheckWrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 40px;
	@media screen and (min-width: 768px) {
		margin-bottom: 47px;
	}
	@media screen and (min-width: 1280px) {
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
