'use client';
/** @jsxImportSource @emotion/react */

import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useWindowWidth } from '~/src/helpers/useWindowWidth';

import CloseMenuIcon from '../../../public/close_menu.svg';
import MenuIcon from '../../../public/open_menu.svg';
import { StoreTypes } from '../../redux/store/store';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { SidebarModal } from '../Sidebar/SidebarModal';
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
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [prevLocation, setPrevLocation] = useState('' as string);

  const windowWidth = useWindowWidth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { control } = useForm<FieldValues>({
    defaultValues: { searchInput: searchParams.get('q') || '' },
  });
  const { participant, isLoading } = useSelector((store: StoreTypes) => store.participants);
  const { token } = useSelector((state: StoreTypes) => state.auth);

  useEffect(() => {
    if (windowWidth && windowWidth >= 768) {
      setShowModal(false);
      setShowSidebar(false);
    }
  }, [windowWidth]);

  const closeModal = () => setShowModal(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
    setShowModal(!showModal);
  };

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
      if (participant && !isLoading) {
        return `${participant?.first_name} ${participant?.last_name}`;
      } else {
        return '';
      }
    } else if (pathname.split('/')[1] === 'projects') {
      return 'Проект (змінити на його назву)';
    } else {
      return 'Невідома фігня, треба виправити';
    }
  };

  const manageUrl = (value: string) => {
    if (value?.length) {
      if ((pathname !== prevLocation && pathname !== '/participants') || !prevLocation.length) {
        setPrevLocation(pathname);
      } else if (pathname !== '/participants') {
        router.push(`/participants?q=${value}`);
      } else {
        router.push(`?q=${value}`);
      }
    } else if (!value?.length) {
      if (!prevLocation.length) router.push('/participants');
      else router.push(prevLocation);
    }
  };

  const goBackHandler = (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    ev.stopPropagation();
    router.push(`/${pathname.split('/')[1]}`);
  };

  //eslint-disable-next-line
  // useEffect(() => manageUrl(searchInput), [searchInput]);

  return token ? (
    <Wrapper isOpen={showModal}>
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

      <MobileHeaderWrapper isOpen={showModal}>
        {windowWidth && windowWidth < 768 && (
          <MenuWrapper>
            <MenuBtn onClick={toggleSidebar}>{showSidebar ? <CloseMenuIcon /> : <MenuIcon />}</MenuBtn>
          </MenuWrapper>
        )}
        <Input name="searchInput" placeholder="Ключове слово" endIconId="search" control={control} maxLength={50} />
      </MobileHeaderWrapper>

      {windowWidth && windowWidth >= 768 && <PageTitle css={[pageMobileTitleStyles]}>{manageHeaderTitle()}</PageTitle>}

      {showModal && <SidebarModal isOpen={showModal} closeModal={closeModal} />}
    </Wrapper>
  ) : (
    <></>
  );
}
