/** @jsxImportSource @emotion/react */
'use client';

import { useForm } from 'react-hook-form';

import throttle from 'lodash.throttle';
import Link from 'next/link';

import MenuIcon from '../../../public/menu.svg';
import { Input } from '../Input/Input';
import {
  DesktopContent,
  Logo,
  MenuBtn,
  MenuWrapper,
  MobileHeaderWrapper,
  pageMobileTitleStyles,
  PageTitle,
  SearchWrapper,
  Wrapper,
} from './Header.styles';

export function Header() {
  const { control, clearErrors } = useForm();

  const throttledHandler = throttle((value: string) => console.log(value), 1000);

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
          <MenuBtn onClick={() => console.log('Open menu')}>
            <MenuIcon />
          </MenuBtn>
        </MenuWrapper>
        <SearchWrapper>
          <Input
            name="search-input"
            placeholder="Ключове слово"
            endIconId="search"
            onTypeFunc={throttledHandler}
            control={control}
            clearErrors={clearErrors}
          />
        </SearchWrapper>
      </MobileHeaderWrapper>
      <PageTitle css={[pageMobileTitleStyles]}>Сайт притулку для вуличних тварин Murrfecto</PageTitle>
    </Wrapper>
  );
}
