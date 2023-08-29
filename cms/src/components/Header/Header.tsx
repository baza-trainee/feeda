/** @jsxImportSource @emotion/react */
'use client';

import { ChangeEvent, useEffect, useState } from 'react';

import Link from 'next/link';

import useMobileDetect from '~/src/hooks/useMobileDetect';
import { useWindowWidth } from '~/src/hooks/useWindowWidth';

import CloseMenuIcon from '../../../public/close_menu.svg';
import MenuIcon from '../../../public/menu.svg';
import SearchIcon from '../../../public/search.svg';
import { SidebarModal } from '../Sidebar/SidebarModal';
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
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const windowWidth = useWindowWidth();
  const mobile = useMobileDetect().isMobile();

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

  return (
    <Wrapper isOpen={showModal}>
      <DesktopContent>
        <Logo>
          <Link href="/">Feeda</Link>
        </Logo>
        <PageTitle title="page name...">Сайт притулку для вуличних тварин Murrfecto</PageTitle>
      </DesktopContent>

      <MobileHeaderWrapper isOpen={showModal}>
        {/*Why it doesnt work?*/}
        {mobile ||
          (windowWidth && windowWidth < 768 && (
            <MenuWrapper>
              <MenuBtn onClick={toggleSidebar}>{showSidebar ? <CloseMenuIcon /> : <MenuIcon />}</MenuBtn>
            </MenuWrapper>
          ))}
        <SearchWrapper isOpen={showModal}>
          <SearchInput
            placeholder="Ключове слово"
            maxLength={50}
            onInput={(ev: ChangeEvent<HTMLInputElement>) => console.log(ev.target.value)}
          />
          <SearchIconBox>
            <SearchIcon />
          </SearchIconBox>
        </SearchWrapper>
      </MobileHeaderWrapper>

      {windowWidth && windowWidth >= 768 && (
        <PageTitle css={[pageMobileTitleStyles]}>Сайт притулку для вуличних тварин Murrfecto</PageTitle>
      )}

      {showModal && <SidebarModal isOpen={showModal} closeModal={closeModal} />}
    </Wrapper>
  );
}
