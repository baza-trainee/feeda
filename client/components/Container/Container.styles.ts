import styled from '@emotion/styled';
import { theme } from 'styles/theme';
const { media } = theme;

export const Wrapper = styled.div`
	width: 100%;
	max-width: 760px;
	/* padding: 0 10px; */
	padding: 80px 0 127px 0;

	margin: 0 auto;

	@media screen and (${media.tablet}) {
		/* padding: 0 20px; */
		padding: 80px 0 123px 0;
	}
	@media screen and (${media.desktop}) {
		/* padding: 0 20px; */
		padding: 128px 0 111px 0;
	}
`;
