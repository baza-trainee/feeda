import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { theme } from 'styles/theme';

const { colors, fonts, media } = theme;

export const FormWrapper = styled(motion.div)`
	padding: 5rem 0 7.75rem 0;
	@media screen and (${media.desktop}) {
		padding: 8rem 0 7rem 0;
	}
`;

export const Form = styled.form`
	margin: 0 auto;
	padding: 2rem;
	width: 100%;
	max-width: 21rem;
	border: 1px solid ${colors.grey200};
	border-radius: 16px;
	font-size: ${fonts.formField.fontSize.input}rem;
	@media screen and (${media.tablet}) {
		max-width: 29rem;
	}
	@media screen and (${media.desktop}) {
		max-width: 28.5rem;
	}
`;

export const CheckWrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 2.5rem;
	@media screen and (${media.tablet}) {
		margin-bottom: 2.875rem;
	}
`;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.75rem;
`;

export const InputsWrapper = styled(Wrapper)`
	margin-bottom: 1.75rem;
`;

export const SelectWrapper = styled(Wrapper)`
	margin-bottom: 2.75rem;

	@media screen and (${media.tablet}) {
		margin-bottom: 3.2rem;
	}
`;
