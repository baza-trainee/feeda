import { breakpointDesktop, breakpointMobile, breakpointTablet } from './vars';

export const colors = {
<<<<<<< HEAD
  // Main colors
  mainBg: "#ffffff", // Baza white
  mainText: '#232323', // Neutral-900
  inputLabel: '#353535', // Neutral-600
  
  // Common colors
  grey100: '#fcfcfc', // Button main text, Input bg
  grey200: '#cecece', // Button disabled bg, Borders
  grey400: '#939393', // Button disabled text, Input placeholder
  grey1000: '#121212', // Title main, Pop-ups text

  // Special colors
  error: "#df4242",
  link: "#0029ff",
  inputSelectHover: '#fdf5dd', // Primary-50
  
  //Accents
  validInput: "#14905d", // Discord value is valid
  accent: "#ffbd00", // Checkbox checked, Button text hover application, Button bg onClick application
  secondaryAccent: "#3342cc", // Discord label(icon)
}

export const fonts = {
  body: {
    fontFamily: "'Exo 2', sans-serif",
    fontSize: { desktop: 1, tablet: 0.875, mobile: 0.75 }, // rem
    lineHeight: { tablet: 1.4, mobile: 1.33 },
    letterSpacing: { tablet: 0.25, mobile: 0.4 }, // px
    fontWeight: 400,
  },
  mainTitle: {
    fontSize: { desktop: 2.81, tablet: 2.25, mobile: 1.375, secondary: 2 }, // rem
    lineHeight: { desktop: 1.15, tablet: 1.22, mobile: 'normal', secondary: 1.25 },
    fontWeight: 700,
  },
  startPopUpText: {
    fontSize: 0.875, // rem
    lineHeight: 1.4 ,
    letterSpacing: 0.25, // px
  },
  endPopUpText: {
    fontSize: { desktop: 1.75,tablet: 1.375, mobile: 1 }, // rem
    lineHeight: { desktop: 1.286, mobile: 'normal' },
    letterSpacing: {tablet: 'normal', mobile: 0.15}, // px
    fontWeight: 600,
  },
  checkbox: {
    fontSize: {  desktop: 0.875, tablet: 1, mobile: 0.75 }, // rem
    lineHeight: { desktop: 1.5, tablet: 'normal', mobile: 1.33 },
    letterSpacing: 0.5, // px
  },
  button: {
    fontSize: 1.375, // rem
    fontWeight: 700,
  }
};

export const media = {
  mobile: `max-width: ${breakpointTablet - 1}px`,
  tablet: `min-width: ${breakpointTablet}px`,
  desktop: `min-width: ${breakpointDesktop}px`,
=======
	mainBg: '',
	secondaryBg: '',
	buttonBg: '',
	error: '#DC0C31',
	link: '#0029FF',
	white: '#FFFFFF',
	//   neutral colors
	mainBtnText: '#FCFCFC',
	disabledBtnBg: '#CECECE',
	mainPlaceholder: '#939393',
	disabledBtnText: '#464646',
	mainLabel: '#353535',
	mainText: '#232323',
	mainTitle: '#121212',
	//   primary color
	mainAccent: '#FFBD00',
	secondaryAccent: '#3342CC',
};

export const fonts = {
	body: {
		fontFamily: "'Exo 2', sans-serif",
		fontSize: { desktop: 16, tablet: 14, mobile: 12 },
		lineHeight: { tablet: 1.4, mobile: 1.33 },
		letterSpacing: { tablet: 0.25, mobile: 0.4 },
		fontWeight: 400,
	},
	label: {
		fontFamily: "'Exo 2', sans-serif",
		fontSize: { desktop: 14, tablet: 12, mobile: 11 },
		lineHeight: { tablet: 1.33, mobile: 1.45 },
		letterSpacing: { desktop: 0.1, mobile: 0.5 },
		fontWeight: 400,
	},
	title: {
		fontFamily: "'Exo 2', sans-serif",
		fontSize: { desktop: 22, tablet: 16, mobile: 14 },
		lineHeight: 1.4,
		letterSpacing: { tablet: 0.15, mobile: 0.1 },
		fontWeight: { desktop: 700, tablet: 600, mobile: 500 },
	},
	headline: {
		fontFamily: "'Exo 2', sans-serif",
		fontSize: { desktop: 32, tablet: 28, mobile: 22 },
		lineHeight: { desktop: 1.25, tablet: 1.3, mobile: 1.4 },
		fontWeight: { tablet: 600, mobile: 400 },
	},
	display: {
		fontFamily: "'Exo 2', sans-serif",
		fontSize: { desktop: 57, tablet: 45, mobile: 36 },
		lineHeight: { desktop: 1.1, tablet: 1.15, mobile: 1.2 },
		fontWeight: 700,
	},
};

export const media = {
	tablet: `min-width: ${breakpointTablet}px`,
	desktop: `min-width: ${breakpointDesktop}px`,
>>>>>>> develop
};

export const theme = {
	colors,
	media,
	fonts,
};
