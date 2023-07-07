import styled from '@emotion/styled';
import { theme } from 'styles/theme';
const { colors, fonts, media } = theme;

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
`;
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
`;

export const Desc = styled.p`
  color: ${colors.mainTitle};

  margin-bottom: 32px;

  font-weight: ${fonts.title.fontWeight.mobile};
  font-size: ${fonts.title.fontSize.mobile}px;
  line-height: ${fonts.title.lineHeight};
  letter-spacing: ${fonts.title.letterSpacing.mobile}px;

  @media screen and (${media.tablet}) {
    font-size: ${fonts.title.fontSize.tablet}px;
    letter-spacing: ${fonts.title.letterSpacing.tablet}px;
    font-weight: ${fonts.title.fontWeight.tablet};
  }

  @media screen and (${media.desktop}) {
    font-size: ${fonts.title.fontSize.desktop}px;
    font-weight: ${fonts.title.fontWeight.desktop};
  }
`;
export const Reminder = styled.h2`
  color: ${colors.mainTitle};
  width: 464px;

  font-weight: ${fonts.headline.fontWeight.mobile};
  font-size: ${fonts.headline.fontSize.mobile}px;
  line-height: ${fonts.headline.lineHeight.mobile};

  @media screen and (${media.tablet}) {
    font-size: ${fonts.headline.fontSize.tablet}px;
    line-height: ${fonts.headline.lineHeight.tablet};
    font-weight: ${fonts.headline.fontWeight.tablet};
  }

  @media screen and (${media.desktop}) {
    font-size: ${fonts.headline.fontSize.desktop}px;
    line-height: ${fonts.headline.lineHeight.desktop};
  }
`;
export const Span = styled.span`
  color: ${colors.secondaryAccent};
`;
