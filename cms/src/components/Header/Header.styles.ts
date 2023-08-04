import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { colors, fonts, media } from '../../styles/theme';

export const Wrapper = styled.header`
  max-width: 100vw;
  margin-bottom: 24px;
  @media screen and (${media.tablet}) {
    display: flex;
    align-items: center;
  }
  @media screen and (${media.desktop}) {
    margin-bottom: 32px;
  }
`;

export const DesktopContent = styled.div`
  display: none;
  white-space: nowrap;
  overflow: hidden;
  margin-right: auto;
  @media screen and (${media.tablet}) {
    display: flex;
    align-items: center;
    padding-right: 39px;
  }
  @media screen and (${media.desktop}) {
    padding-right: 34px;
  }
`;

export const logoStyles = css`
  margin-right: 16px;
  padding: 16px;
  border-radius: 0px 0px 4px 4px;
  color: ${colors.mainTitle};
  font-size: 36px;
  font-weight: 700;
  line-height: 1.22;
  background-color: ${colors.mainAccent};
  @media screen and (${media.desktop}) {
    padding: 16px 134px 16px 24px;
    font-size: 45px;
    line-height: 1.15;
  }
`;

export const pageMobileTitleStyles = css`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  margin-top: 16px;
  @media screen and (${media.tablet}) {
    display: none;
  }
`;

export const PageTitle = styled.h1`
  font-size: ${fonts.headline.fontSize.desktop}px;
  font-weight: ${fonts.headline.fontWeight.tablet};
  line-height: ${fonts.headline.lineHeight.desktop};
  color: ${colors.mainTitle};
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const MobileHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const MenuWrapper = styled.div`
  width: 72px;
  height: 72px;
  padding: 16px;
  margin-right: 24px;
  border-radius: 0px 0px 8px 8px;
  background-color: ${colors.mainAccent};
  @media screen and (${media.tablet}) {
    display: none;
  }
`;

export const MenuBtn = styled.button`
  width: 100%;
  height: 100%;
  padding: 8px;
  border: 0;
  border-radius: 4px;
  background-color: #232323;
`;

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  border-radius: 4px;
  max-width: 239px;
  padding-right: 16px;
  margin-left: auto;
  border: 1px solid #cecece;
  &:has(input:focus) {
    outline: #939393 solid 2px;
  }
  @media screen and (${media.tablet}) {
    max-width: 223px;
    min-width: 223px;
  }
  @media screen and (${media.desktop}) {
    max-width: 388px;
    min-width: 388px;
  }
`;

export const SearchInput = styled.input`
  padding: 16px;
  border: 0;
  border-radius: 4px 0 0 4px;
  color: ${colors.mainText};
  width: 100%;
  font-size: 16px;
  background-color: transparent;
  &::-webkit-input-placeholder {
    color: #767676;
  }
`;
