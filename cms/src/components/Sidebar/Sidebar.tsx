'use client';

import { useState } from 'react';

import { Button } from '../Button/Button';
import { SignOutBtn } from '../SignOutBtn/SignOutBtn';
import { Nav, NavLink, ProjectsWrapper, SidebarWrapper, Wrapper } from './Sidebar.style';

export function Sidebar() {
  const [showProjectsOptions, setShowProjectsOptions] = useState(false);
  const [showParticipantsList, setShowParticipantsList] = useState(false);
  const [showTeamBuildingOptions, setShowTeamBuildingOptions] = useState(false);
  const [showInDevelopmentOptions, setShowInDevelopmentOptions] = useState(false);
  const [showCompletedOptions, setShowCompletedOptions] = useState(false);

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
  const teamBuildingOptions = [
    { label: 'Безкоштовний', link: '/projects/team-building/free' },
    { label: 'Платний', link: '/projects/team-building/paid' },
    { label: 'Буткамп', link: '/projects/team-building/bootcamp' },
  ];

  const inDevelopmentOptions = [
    { label: 'Project in development 1', link: '/projects/team-building/free' },
    { label: 'Project in development 2', link: '/projects/team-building/paid' },
    { label: 'Project in development 3', link: '/projects/team-building/bootcamp' },
  ];

  const completedOptions = [
    { label: 'Project in completed 1', link: '/projects/team-building/free' },
    { label: 'Project in completed 2', link: '/projects/team-building/paid' },
    { label: 'Project in completed 3', link: '/projects/team-building/bootcamp' },
  ];

  return (
    <SidebarWrapper>
      <Nav>
        <Wrapper>
          <Button
            variant="nav"
            func={toggleProjectsOptions}
            title="Проєкти"
            icon="edit"
            secondIcon="arrowDown"
            btnClicked={showProjectsOptions}
          />

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
                  {teamBuildingOptions.map((option, index) => (
                    <NavLink href={option.link} key={index}>
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
                  {inDevelopmentOptions.map((option, index) => (
                    <NavLink href={option.link} key={index}>
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
                  {completedOptions.map((option, index) => (
                    <NavLink href={option.link} key={index}>
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
      <SignOutBtn />
    </SidebarWrapper>
  );
}
