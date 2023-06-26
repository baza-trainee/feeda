import { css } from "@emotion/react";
import { theme } from "styles/theme";

export const buttonStyle = css`
	padding: 16px 24px;
	font-weight: 700;
	font-size: 22px;
	text-align: center;
	border-radius: 4px;
	color: ${theme.colors.neutral100};
	background-color: ${theme.colors.neutral900};
	border:none;

	&:disabled {
		color: ${theme.colors.neutral700};
		background-color: ${theme.colors.neutral200};
	}
`;
