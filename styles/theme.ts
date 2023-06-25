import { breakpointTablet, breakpointDesktop } from "./vars";

export const colors = {
    mainBg: '',
    secondaryBg: '',
    buttonBg: '',
    mainText: '',
    error: '#DC0C31',
    link: '#0029FF'
}

export const fonts = {
    body: {
        fontFamily: "'Exo 2', sans-serif",
        fontSize: { desktop: 16, tablet: 14, mobile: 12 },
        lineHeight: { tablet: 1.4, mobile: 1.33 },
        leterSpacing: { tablet: 0.25, mobile: 0.4 },
        fontWeight: 400,
    },
    label: {},
    title: {},
    headline: {},
    display: {}
}

export const media = {
    tablet: `min-width: ${breakpointTablet}`,
    desktop: `min-width: ${breakpointDesktop}`
}


export const theme = {
    colors,
    media,
    fonts
}