/** @jsxImportSource @emotion/react */
'use client';

import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import throttle from 'lodash.throttle';
import Link from 'next/link';

import MenuIcon from '../../../public/menu.svg';
import { fetchParticipants, searchParticipants } from '../../slices/participants/operations';
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
  const dispatch = useDispatch();
  const { control, clearErrors } = useForm();

  const throttledSearch = throttle(
    (value: string) => {
      if (value.length > 2) {
        dispatch(searchParticipants(value));
      } else if (!value.length) {
        dispatch(fetchParticipants());
        console.log('fetch initial');
      }
    },
    400,
    { trailing: true, leading: false }
  );

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
            onTypeFunc={throttledSearch}
            control={control}
            clearErrors={clearErrors}
          />
        </SearchWrapper>
      </MobileHeaderWrapper>
      <PageTitle css={[pageMobileTitleStyles]}>Сайт притулку для вуличних тварин Murrfecto</PageTitle>
    </Wrapper>
  );
}
