'use client';
/** @jsxImportSource @emotion/react */

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import MenuIcon from '../../../public/menu.svg';
import { StoreTypes } from '../../store/store';
import { Input } from '../Input/Input';
import {
  DesktopContent,
  Logo,
  MenuBtn,
  MenuWrapper,
  MobileHeaderWrapper,
  pageMobileTitleStyles,
  PageTitle,
  Wrapper,
} from './Header.styles';

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { control, clearErrors } = useForm();
  const [prevLocation, setPrevLocation] = useState('' as string);
  const { participant, isLoading } = useSelector((store: StoreTypes) => store.participants);

  const manageHeaderTitle = () => {
    if (pathname === '/participants') {
      return 'Учасники';
    } else if (pathname === '/projects') {
      return 'Проєкти';
    } else if (pathname === '/participants/create') {
      return 'Додати учасника';
    } else if (pathname === '/projects/create') {
      return 'Додати проект';
    } else if (pathname.split('/')[1] === 'participants') {
      if (participant) {
        return `${participant?.first_name} ${participant?.last_name}`;
      } else if (isLoading) {
        return '';
      }
    } else if (pathname.split('/')[1] === 'projects') {
      return 'Проект';
    } else {
      return 'Невідома фігня, треба виправити';
    }
  };

  const manageUrl = (value: string) => {
    if (value.length) {
      if ((pathname !== prevLocation && pathname !== '/participants') || !prevLocation.length) {
        console.log(pathname);
        setPrevLocation(pathname);
      } else if (pathname !== '/participants' || pathname.split('/')[1] !== 'participants') {
        router.push(`/participants?q=${value}`);
      } else {
        router.push(`?q=${value}`);
      }
    } else if (!value.length) {
      router.push(prevLocation);
    }
  };

  return (
    <Wrapper>
      <DesktopContent>
        <Logo>
          <Link href="/">Feeda</Link>
        </Logo>
        <PageTitle title="page name...">{manageHeaderTitle()}</PageTitle>
      </DesktopContent>
      <MobileHeaderWrapper>
        <MenuWrapper>
          <MenuBtn onClick={() => console.log('Open menu')}>
            <MenuIcon />
          </MenuBtn>
        </MenuWrapper>
        <Input
          name="search-input"
          placeholder="Ключове слово"
          endIconId="search"
          onTypeFunc={manageUrl}
          defaultValue={searchParams.get('q') || ''}
          control={control}
          clearErrors={clearErrors}
        />
      </MobileHeaderWrapper>
      <PageTitle css={[pageMobileTitleStyles]}>Сайт притулку для вуличних тварин Murrfecto</PageTitle>
    </Wrapper>
  );
}
