'use client';
/** @jsxImportSource @emotion/react */

import Image from 'next/image';

import logo from '../../../public/logo.svg';
import menuIcon from '../../../public/menu.svg';
import searchIcon from '../../../public/search.svg';
import {
  DesktopContent,
  LogoWrapper,
  MenuBtn,
  MenuWrapper,
  SearchInput,
  SearchWrapper,
  Wrapper,
} from './Header.styles';

export function Header() {
  return (
    <Wrapper>
      <DesktopContent>
        <LogoWrapper>
          <Image src={logo} width={128} height={40} alt="Feeda" />
        </LogoWrapper>
        <h1>...Page name...</h1>
      </DesktopContent>
      <MenuWrapper>
        <MenuBtn onClick={() => console.log('Open menu')}>
          <Image src={menuIcon} width={24} alt="Відкрити меню" />
        </MenuBtn>
      </MenuWrapper>
      <SearchWrapper>
        <SearchInput placeholder="Ключове слово" onInput={(ev) => console.log(ev.target.value)} />
        <Image src={searchIcon} width={24} alt="Пошук" />
      </SearchWrapper>
    </Wrapper>
  );
}
