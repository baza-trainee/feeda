import styled from '@emotion/styled';

import { theme } from 'styles/theme';
const { colors, media } = theme;

export const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	min-height: 100vh;
	margin: 0 auto;
	width: 100%;
	gap: 32px;
	max-width: 334px;
	padding: 0 30px;

	@media screen and (${media.tablet}) {
		max-width: 675px;
		font-size: 36px;
		gap: 48px;
		padding: 0 ;
	}

	@media screen and (${media.desktop}) {
		max-width: 759px;
		/* font-size: 45px; */
	}
`;
export const Button = styled.button`
	padding: 16px 24px;

	font-size: 22px;
	font-weight: 700;

	border-radius: 4px;
	background: ${colors.mainText};
	color: ${colors.mainBtnText};

	cursor: pointer;
`;
