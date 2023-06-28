import styled from "@emotion/styled"
import { theme } from "styles/theme"
const { colors, fonts, media } = theme

export const Section = styled.section`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  text-align: center;
  margin: 0 auto;
  padding: 24px;

  border-radius: 16px;
  border: 1px solid ${colors.disabledBtnBg};
`
export const Title = styled.h1`
  color: ${colors.mainTitle};

  margin-bottom: 32px;

  font-weight: ${fonts.display.fontWeight};
  font-size: ${fonts.display.fontSize.mobile}px;
  line-height: ${fonts.display.lineHeight.mobile};

  @media screen and (${media.tablet}) {
    font-size: ${fonts.display.fontSize.tablet}px;
    line-height: ${fonts.display.lineHeight.tablet};
  }

  @media screen and (${media.desktop}) {
    font-size: ${fonts.display.fontSize.desktop}px;
    line-height: ${fonts.display.lineHeight.desktop};
  }
`

export const Desc = styled.p`
  color: ${colors.mainTitle};

  margin-bottom: 32px;

  font-weight: ${fonts.body.fontWeight};
  font-size: ${fonts.body.fontSize.mobile}px;
  line-height: ${fonts.body.lineHeight.mobile};
  letter-spacing: ${fonts.body.letterSpacing.mobile};

  @media screen and (${media.tablet}) {
    font-size: ${fonts.body.fontSize.tablet}px;
    line-height: ${fonts.body.lineHeight.tablet};
    letter-spacing: ${fonts.body.letterSpacing.tablet};
  }

  @media screen and (${media.desktop}) {
    font-size: ${fonts.body.fontSize.desktop}px;
  }
`
export const Reminder = styled.h2`
  color: ${colors.mainTitle};
  width: 464px;

  font-weight: ${fonts.headline.fontWeight};
  font-size: ${fonts.headline.fontSize.mobile}px;
  line-height: ${fonts.headline.lineHeight.mobile};

  @media screen and (${media.tablet}) {
    font-size: ${fonts.headline.fontSize.tablet}px;
    line-height: ${fonts.headline.lineHeight.tablet};
  }

  @media screen and (${media.desktop}) {
    font-size: ${fonts.headline.fontSize.desktop}px;
    line-height: ${fonts.headline.lineHeight.desktop};
  }
`
