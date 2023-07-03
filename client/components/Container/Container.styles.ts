import styled from '@emotion/styled';
import { theme } from 'styles/theme';
const { media } = theme;

export const Wrapper = styled.div`
	width: 100%;
	max-width: 760px;
	padding: 0 10px;
	margin: 0 auto;

	@media screen and (${media.tablet}) {
		padding: 0 20px;
	}
`;
