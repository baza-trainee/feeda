import styled from '@emotion/styled';
import { theme } from 'styles/theme';
const { colors, media, fonts } = theme;

export const Wrapper = styled.section`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;

	min-height: 100vh;
	gap: 32px;
	padding: 0 30px;

	@media screen and (${media.tablet}) {
		gap: 48px;
	}
`;

export const TextWrapper = styled.div`
	max-width: 329px;
	color: ${colors.mainTitle};
	text-align: center;
	line-height: normal;
	font-size: ${fonts.title.fontSize.tablet}px;

	@media screen and (${media.tablet}) {
		max-width: 525px;
		line-height: ${fonts.title.lineHeight};
		font-size: ${fonts.title.fontSize.desktop}px;
	}
`;

export const Span = styled.span`
	color: #0029ff;
	cursor: pointer;
`;
