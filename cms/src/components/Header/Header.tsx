'use client';
/** @jsxImportSource @emotion/react */

import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { StoreTypes } from '../../redux/store/store';
import { Button } from '../Button/Button';
import { IconSprite } from '../IconSprite/IconSprite';
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
  const [prevLocation, setPrevLocation] = useState('');
  const { participant, isLoading } = useSelector((store: StoreTypes) => store.participants);
  const { control, getValues } = useForm<FieldValues>({
    defaultValues: { searchInput: searchParams.get('q') || '' },
  });

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
      participant && !isLoading ? `${participant?.first_name} ${participant?.last_name}` : '';
    } else if (pathname.split('/')[1] === 'projects') {
      return 'Проект (змінити на його назву)';
    } else {
      return 'Невідома фігня, треба виправити';
    }
  };

  const setSearch = (ev: React.FormEvent) => {
    ev.preventDefault();
    const value = getValues('searchInput');
    if (value.length) {
      if (pathname !== '/participants') setPrevLocation(pathname);
      router.push(`/participants?q=${value}`);
    } else if (!value?.length) {
      prevLocation.length ? router.push(prevLocation) : router.push('/participants');
    }
  };

  const goBackHandler = (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    ev.stopPropagation();
    router.push(`/${pathname.split('/')[1]}`);
  };

  return (
    <Wrapper>
      <DesktopContent>
        <Logo>
          <Link href="/projects">
            Feeda
            {pathname !== '/participants' && pathname !== '/projects' && (
              <Button variant="goBack" icon="arrowLeft" func={goBackHandler} />
            )}
          </Link>
        </Logo>
        <PageTitle title="page name...">{manageHeaderTitle()}</PageTitle>
      </DesktopContent>
      <MobileHeaderWrapper>
        <MenuWrapper>
          <MenuBtn onClick={() => console.log('Open menu')}>
            <IconSprite icon="openMenu" />
          </MenuBtn>
        </MenuWrapper>
        <form onSubmit={setSearch} id="form">
          <Input
            name="searchInput"
            placeholder="Ключове слово"
            endIconId="search"
            submitBtn={true}
            control={control}
            maxLength={50}
          />
        </form>
      </MobileHeaderWrapper>
      <PageTitle css={[pageMobileTitleStyles]}>{manageHeaderTitle()}</PageTitle>
    </Wrapper>
  );
}
