import { css } from "@emotion/react";
import { theme } from "~styles/theme";

export const buttonStyle = css`
	padding: 16px 24px;

	font-weight: ${theme.fonts.button.fontWeight};
	font-size: ${theme.fonts.button.fontSize}rem;
	
	border-radius: 4px;
	color: ${theme.colors.grey100};
	background-color: ${theme.colors.mainText};

	&:disabled {
		color: ${theme.colors.grey400};
		background-color: ${theme.colors.grey200};
	}
`;
