/** @jsxImportSource @emotion/react */
'use client';

import { useState } from 'react';

import Link from 'next/link';

import CloseMenuIcon from '../../../public/close_menu.svg';
import MenuIcon from '../../../public/menu.svg';
import SearchIcon from '../../../public/search.svg';
import { Sidebar } from '../Sidebar/Sidebar';
import {
  DesktopContent,
  Logo,
  MenuBtn,
  MenuWrapper,
  MobileHeaderWrapper,
  pageMobileTitleStyles,
  PageTitle,
  SearchIconBox,
  SearchInput,
  SearchWrapper,
  Wrapper,
} from './Header.styles';

export function Header() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <Wrapper>
      <DesktopContent>
        <Logo>
          <Link href="/">Feeda</Link>
        </Logo>
        <PageTitle title="page name...">Сайт притулку для вуличних тварин Murrfecto</PageTitle>
      </DesktopContent>
      <MobileHeaderWrapper>
        <MenuWrapper>
          <MenuBtn onClick={() => setShowSidebar(!showSidebar)}>
            {showSidebar ? <CloseMenuIcon style={{ fill: '#fff' }} /> : <MenuIcon />}
          </MenuBtn>
        </MenuWrapper>
        <SearchWrapper>
          <SearchInput placeholder="Ключове слово" maxLength={50} onInput={(ev) => console.log(ev.target.value)} />
          <SearchIconBox>
            <SearchIcon />
          </SearchIconBox>
        </SearchWrapper>
      </MobileHeaderWrapper>
      <PageTitle css={[pageMobileTitleStyles]}>Сайт притулку для вуличних тварин Murrfecto</PageTitle>

      {showSidebar && <Sidebar />}
    </Wrapper>
  );
}
