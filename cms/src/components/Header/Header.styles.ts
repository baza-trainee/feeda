import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { colors, fonts, media } from '../../styles/theme';
import { breakpointTablet } from '../../styles/vars';

export const Wrapper = styled.header<{ isOpen: boolean }>`
  margin-bottom: ${({ isOpen }) => (isOpen ? '0px' : '24px')};
  padding-bottom: ${({ isOpen }) => (isOpen ? '24px' : '0px')};
  background-color: ${({ isOpen }) => (isOpen ? colors.mainAccent : 'initial')};

  @media screen and (${media.tablet}) {
    display: flex;
    align-items: center;
    gap: 1rem;
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
    gap: 24px;
  }
`;

export const Logo = styled.div`
  position: relative;
  width: fit-content;
  border-radius: 0px 0px 4px 4px;
  color: ${colors.mainTitle};
  font-size: 36px;
  font-weight: 700;
  line-height: calc(44 / 36);
  background-color: ${colors.mainAccent};
  @media screen and (${media.desktop}) {
    width: 100%;
    max-width: 286px;
    font-size: 45px;
    line-height: calc(52 / 45);
  }
  & > a {
    display: inline-block;
    padding: 16px;
    @media screen and (${media.desktop}) {
      padding: 16px 134px 16px 24px;
    }
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
  width: 100%;
`;

export const MobileHeaderWrapper = styled.div<{ isOpen: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  background-color: ${({ isOpen }) => (isOpen ? colors.mainAccent : 'initial')};
  @media screen and (${media.tablet}) {
    max-width: 223px;
  }
  @media screen and (${media.desktop}) {
    max-width: 388px;
  }

  & > div#input-wrapper {
    width: 100%;
    @media screen and (max-width: ${breakpointTablet}px) {
      max-width: 239px;
    }
  }
`;

export const MenuWrapper = styled.div`
  padding: 16px;
  border-radius: 0px 0px 8px 8px;
  background-color: ${colors.mainAccent};
  @media screen and (${media.tablet}) {
    display: none;
  }
`;

export const MenuBtn = styled.button`
  padding: 8px;
  border: 0;
  border-radius: 4px;
  background-color: #232323;
  & svg {
    display: block;
  }
`;

export const SearchWrapper = styled.div<{ isOpen: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;
  border: 1px solid #cecece;
  &:has(input:focus) {
    outline: #939393 solid 2px;
  }
  max-width: 388px;
  background-color: ${({ isOpen }) => (isOpen ? colors.white : 'initial')};
`;

export const SearchIconBox = styled.div`
  padding: 16px 16px 14px 16px;
  height: fit-content;
  & svg {
    display: block;
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
