import styled from '@emotion/styled';
import Link from 'next/link';

import { colors, fonts, media } from '../../styles/theme';

export const SidebarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export const Nav = styled.nav`
  width: 334px;
  margin-bottom: 30vh;

  @media screen and (${media.tablet}) {
    width: 224px;
    margin-bottom: 60vh;
  }

  @media screen and (${media.desktop}) {
    width: 286px;
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
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-weight: ${fonts.body.fontWeight};
  font-size: ${fonts.body.fontSize.desktop}px;
  border-bottom: 1px solid ${colors.disabledBtnBg};
  white-space: nowrap;
  overflow: hidden;
  height: 35px;

  &:hover {
    background-color: ${colors.mainLabel};
    color: ${colors.white};
  }

  transition: all 250ms ease-in;
`;
