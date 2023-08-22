import { breakpointDesktop, breakpointTablet } from './vars';

export const colors = {
	// Main colors
	mainBg: '#ffffff', // Baza white
	mainText: '#232323', // Neutral-900
	inputLabel: '#353535', // Neutral-600

	// Common colors
	grey100: '#fcfcfc', // Button main text, Input bg
	grey200: '#cecece', // Button disabled bg, Borders, Scrollbar
	grey400: '#939393', // Button disabled text, Input placeholder
	grey1000: '#121212', // Title main, Pop-ups text

	// Special colors
	error: '#df4242',
	link: '#0029ff',
	inputSelectHover: '#fdf5dd', // Primary-50

	//Accents
	hoverBox: 'rgba(206, 206, 206, 0.1)',
	hoverBoxChecked: 'rgba(252, 220, 127, 0.2)',
	validInput: '#14905d', // Discord value is valid
	accent: '#ffbd00', // Checkbox checked, Button text hover application, Button bg onClick application
	secondaryAccent: '#3342cc', // Discord label(icon)
};

export const fonts = {
	body: {
		fontFamily: "'Exo 2', sans-serif",
		fontSize: { desktop: 1, tablet: 0.875, mobile: 0.75 }, // rem
		lineHeight: { tablet: 1.4, mobile: 1.33 },
		letterSpacing: { tablet: 0.25, mobile: 0.4 }, // px
		fontWeight: 400,
	},
	startPopUp: {
		fontSize: { tablet: 1.375, mobile: 1 }, // rem
		lineHeight: 1.4,
		letterSpacing: 0.15, // px
		fontWeight: { tablet: 700, mobile: 600 },
	},
	modal: {
		fontSize: { tablet: 0.875, mobile: 1.125 }, // rem
		letterSpacing: 0.25, // px
	},
	endPopUp: {
		fontSize: { desktop: 1.75, tablet: 1.375, mobile: 1 }, // rem
		lineHeight: 1.286,
		letterSpacing: 0.15, // px
		fontWeight: { desc: 600, reminder: 700 },
	},
	mainTitle: {
		fontSize: { desktop: 2.81, tablet: 2.25, mobile: 1.375, secondary: 2 }, // rem
		lineHeight: { desktop: 1.15, tablet: 1.22, secondary: 1.25 },
		fontWeight: { tablet: 700, mobile: 600 },
	},
	formField: {
		fontSize: { validation: 0.75, input: 1 }, // rem
		letterSpacing: 0.5, // px
	},
	checkbox: {
		fontSize: { tablet: 0.875, mobile: 0.75 }, // rem
		lineHeight: { desktop: 1.5, mobile: 1.33 },
		letterSpacing: 0.5, // px
	},
	button: {
		fontSize: 1.375, // rem
		fontWeight: 700,
	},
};

export const media = {
	mobile: `max-width: ${breakpointTablet - 1}px`,
	tablet: `min-width: ${breakpointTablet}px`,
	desktop: `min-width: ${breakpointDesktop}px`,
};

export const theme = {
	colors,
	media,
	fonts,
};
