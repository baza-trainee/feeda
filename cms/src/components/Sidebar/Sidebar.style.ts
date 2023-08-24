import styled from '@emotion/styled';
import Link from 'next/link';

import { colors, fonts, media } from '../../styles/theme';

export const Nav = styled.nav`
  max-width: 334px;
  margin-bottom: 16px;
  width: 100%;

  @media screen and (${media.tablet}) {
    max-width: 224px;
  }

  @media screen and (${media.desktop}) {
    max-width: 286px;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const ProjectsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-left: 40px;
`;

export const NavLink = styled(Link)`
  padding: 8px 16px;
  font-weight: ${fonts.body.fontWeight};
  font-size: ${fonts.body.fontSize.desktop}px;
  border-bottom: 1px solid ${colors.disabledBtnBg};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 35px;

  &:hover {
    background-color: ${colors.mainLabel};
    color: ${colors.white};
  }

  transition: all 250ms ease-in;
`;

export const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  background-color: ${colors.mainAccent};
`;

export const ModalWindow = styled.div`
  max-width: calc(100vw - 60px);
  max-height: calc(100vh - 24px);
  overflow-y: auto;
  width: 100%;
  display: flex;
  justify-content: center;
`;
