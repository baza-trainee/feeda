import { breakpointTablet, breakpointDesktop } from "./vars";

export const colors = {
	mainBg: "",
	secondaryBg: "",
	buttonBg: "",
	mainText: "",
	error: "#DC0C31",
	link: "#0029FF",
};

export const fonts = {
	body: {
		fontSize: { desktop: 16, tablet: 14, mobile: 12 },
		lineHeight: { tablet: 1.4, mobile: 1.33 },
		leterSpacing: { tablet: 0.25, mobile: 0.4 },
		fontWeight: 400,
	},
	label: {},
	title: {},
	headline: {},
	display: {},
};

export const media = {
	tablet: `min-width: ${breakpointTablet}px`,
	desktop: `min-width: ${breakpointDesktop}px`,
};

export const theme = {
	colors,
	media,
};
