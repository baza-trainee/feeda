import { breakpointTablet, breakpointDesktop } from "./vars"

export const colors = {
  mainBg: "",
  secondaryBg: "",
  buttonBg: "",
  mainText: "",
  error: "#DC0C31",
  link: "#0029FF",
  //   neutral colors
  lightGray: "#DDDDDD",
  mediumGray: "#CECECE",
  darkGray: "#BFBFBF",
  charcoal: "#B1B1B1",
  dimGray: "#939393",
  steelGray: "#585858",
  darkSteelGray: "#464646",
  darkSlateGray: "#353535",
  jetBlack: "#232323",
  highlightYellow: "#FFE37E",
}

export const fonts = {
  body: {
    fontFamily: "'Exo 2', sans-serif",
    fontSize: { desktop: 16, tablet: 14, mobile: 12 },
    lineHeight: { tablet: 1.4, mobile: 1.33 },
    leterSpacing: { tablet: 0.25, mobile: 0.4 },
    fontWeight: 400,
  },
  label: {
    fontFamily: "'Exo 2', sans-serif",
    fontSize: { desktop: 14, tablet: 12, mobile: 11 },
    lineHeight: { tablet: 1.33, mobile: 1.45 },
    leterSpacing: { desktop: 0.1, mobile: 0.5 },
    fontWeight: 400,
  },
  title: {},
  headline: {},
  display: {},
}

export const media = {
  tablet: `min-width: ${breakpointTablet}px`,
  desktop: `min-width: ${breakpointDesktop}px`,
}

export const theme = {
  colors,
  media,
  fonts,
}
