'use client';

import { useState } from 'react';

import useMobileDetect from '~/src/helpers/useMobileDetect';
import { useAppSelector } from '~/src/redux/hooks';

import { Button } from '../Button/Button';
import { Nav, NavLink, ProjectsWrapper, Wrapper } from './Sidebar.style';
import Link from 'next/link';

export function Sidebar({ closeModal, onMobileMenu }: { closeModal?: () => void; onMobileMenu?: boolean }) {
  const [showProjectsOptions, setShowProjectsOptions] = useState(false);
  const [showParticipantsList, setShowParticipantsList] = useState(false);
  const [showTeamBuildingOptions, setShowTeamBuildingOptions] = useState(false);
  const [showInDevelopmentOptions, setShowInDevelopmentOptions] = useState(false);
  const [showCompletedOptions, setShowCompletedOptions] = useState(false);
  const { isLoggedIn } = useAppSelector(({ auth }) => auth);
  const mobile = useMobileDetect().isMobile();

  // First Layer
  const toggleProjectsOptions = () => {
    setShowProjectsOptions(!showProjectsOptions);
    setShowTeamBuildingOptions(false);
    setShowInDevelopmentOptions(false);
    setShowCompletedOptions(false);
    setShowParticipantsList(false);
  };

  const toggleParticipantsList = () => {
    setShowParticipantsList(!showParticipantsList);
    setShowProjectsOptions(false);
    setShowTeamBuildingOptions(false);
    setShowInDevelopmentOptions(false);
    setShowCompletedOptions(false);
  };

  // Second Layer
  const toggleTeamBuildingOptions = () => {
    setShowTeamBuildingOptions(!showTeamBuildingOptions);
    setShowInDevelopmentOptions(false);
    setShowCompletedOptions(false);
    setShowParticipantsList(false);
  };

  const toggleInDevelopmentOptions = () => {
    setShowInDevelopmentOptions(!showInDevelopmentOptions);
    setShowTeamBuildingOptions(false);
    setShowCompletedOptions(false);
    setShowParticipantsList(false);
  };

  const toggleCompletedOptions = () => {
    setShowCompletedOptions(!showCompletedOptions);
    setShowInDevelopmentOptions(false);
    setShowTeamBuildingOptions(false);
    setShowParticipantsList(false);
  };

  // Third Layer
  const projectsOptions = [
    { label: 'Безкоштовний', link: '/projects/team-building/free' },
    { label: 'Платний', link: '/projects/team-building/paid' },
    { label: 'Буткамп', link: '/projects/team-building/bootcamp' },
  ];

  return (!mobile || onMobileMenu) && isLoggedIn ? (
    <Nav>
      <Wrapper>
        <Link href="/projects/">
          <Button
            variant="nav"
            func={toggleProjectsOptions}
            title="Проєкти"
            icon="edit"
            secondIcon="arrowDown"
            btnClicked={showProjectsOptions}
          />
        </Link>
        {showProjectsOptions && (
          <ProjectsWrapper>
            <Button
              func={toggleTeamBuildingOptions}
              title="Формування"
              titleContinuation={true}
              variant="subnav"
              secondIcon="arrowDown"
              btnClicked={showTeamBuildingOptions}
            />
            {showTeamBuildingOptions && (
              <ProjectsWrapper>
                {projectsOptions.map((option, index) => (
                  <NavLink
                    href={{ pathname: '/projects/', query: { status: 'Формування', type: option.label } }}
                    onClick={closeModal}
                    key={index}
                  >
                    {option.label}
                  </NavLink>
                ))}
              </ProjectsWrapper>
            )}
            <Button
              func={toggleInDevelopmentOptions}
              title="В розробці"
              variant="subnav"
              secondIcon="arrowDown"
              btnClicked={showInDevelopmentOptions}
            />
            {showInDevelopmentOptions && (
              <ProjectsWrapper>
                {projectsOptions.map((option, index) => (
                  <NavLink
                    href={{ pathname: '/projects/', query: { status: 'В розробці', type: option.label } }}
                    onClick={closeModal}
                    key={index}
                  >
                    {option.label}
                  </NavLink>
                ))}
              </ProjectsWrapper>
            )}
            <Button
              func={toggleCompletedOptions}
              title="Завершені"
              variant="subnav"
              secondIcon="arrowDown"
              btnClicked={showCompletedOptions}
            />

            {showCompletedOptions && (
              <ProjectsWrapper>
                {projectsOptions.map((option, index) => (
                  <NavLink
                    href={{ pathname: '/projects/', query: { status: 'Завершений', type: option.label } }}
                    onClick={closeModal}
                    key={index}
                  >
                    {option.label}
                  </NavLink>
                ))}
              </ProjectsWrapper>
            )}
          </ProjectsWrapper>
        )}

        <Button
          variant="nav"
          func={toggleParticipantsList}
          title="Учасники"
          icon="team"
          btnClicked={showParticipantsList}
        />
      </Wrapper>
    </Nav>
  ) : (
    <></>
  );
}
