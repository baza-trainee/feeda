/** @jsxImportSource @emotion/react */
'use client';

import Link from 'next/link';

import MenuIcon from '../../../public/menu.svg';
import SearchIcon from '../../../public/search.svg';
import {
  DesktopContent,
  logoStyles,
  MenuBtn,
  MenuWrapper,
  MobileHeaderWrapper,
  pageMobileTitleStyles,
  PageTitle,
  SearchInput,
  SearchWrapper,
  Wrapper,
} from './Header.styles';

export function Header() {
  return (
    <Wrapper>
      <DesktopContent>
        <Link href="/" css={logoStyles}>
          Feeda
        </Link>
        <PageTitle>Page name...</PageTitle>
      </DesktopContent>
      <MobileHeaderWrapper>
        <MenuWrapper>
          <MenuBtn onClick={() => console.log('Open menu')}>
            <MenuIcon />
          </MenuBtn>
        </MenuWrapper>
        <SearchWrapper>
          <SearchInput placeholder="Ключове слово" maxLength={50} onInput={(ev) => console.log(ev.target.value)} />
          <SearchIcon />
        </SearchWrapper>
      </MobileHeaderWrapper>
      <PageTitle css={[pageMobileTitleStyles]}>Page name...</PageTitle>
    </Wrapper>
  );
}
