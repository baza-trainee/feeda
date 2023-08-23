'use client';

import { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { commonVariants } from '../../helpers/commonVariants';
import { deleteParticipant, ParticipantData } from '../../slices/participants/operations';
import { ProjectData } from '../../slices/projects/index';
import { Button } from '../Button/Button';
import { IconSprite, IconType } from '../IconSprite/IconSprite';
import { PopUp } from '../PopUp/PopUp';
import {
  FirstBlockWrapper,
  List,
  ListItem,
  SecondBlockWrapper,
  ThirdBlockElementsWrapper,
  ThirdBlockWrapper,
} from './CardsContent.styles';

type CardsContentType = {
  type: 'participants' | 'projects' | 'search';
  data: ParticipantData[] | ProjectData[];
  // fromSearch?: boolean;
};
export function CardsContent({ type, data, fromSearch }: CardsContentType) {
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <List>
      {data.map((item: ParticipantData | ProjectData) => {
        return (
          <ListItem key={item.id}>
            <Link
              href={
                fromSearch
                  ? item.id.toString()
                  : type === 'participants'
                  ? `participants/${item.id}`
                  : `projects/${item.id}`
              }
            >
              <FirstBlockWrapper>
                <Button
                  variant="icon"
                  icon="trash"
                  func={(ev) => {
                    ev.preventDefault();
                    ev.stopPropagation();
                    dispatch(deleteParticipant(item.id));
                  }}
                />
                <Button
                  variant="icon"
                  icon="pencil"
                  func={(ev) => {
                    ev.preventDefault();
                    ev.stopPropagation();
                    router.push(fromSearch ? `edit/${item.id}` : `${type}/edit/${item.id}`);
                  }}
                />
                <p>{item.type_participant?.title || item.type_project.project_type}</p>
              </FirstBlockWrapper>
              <SecondBlockWrapper type={type}>
                {type === 'participants' ? (
                  <>
                    <h2 title={item.last_name}>{item.last_name}</h2>
                    <h2 title={item.first_name}>{item.first_name}</h2>
                    <p title={item.stack}>{item.stack || 'None'}</p>
                  </>
                ) : (
                  <>
                    <h2 title={item.title}>{item.title}</h2>
                    <p title={item.participants}>{item.participants} Учасник</p>
                  </>
                )}
              </SecondBlockWrapper>
              <ThirdBlockWrapper>
                {type === 'participants' ? (
                  <>
                    <ThirdBlockElementsWrapper>
                      <p id="name">Досвід</p>
                      <p id="value">{item.experience ? 'Так' : 'Ні'}</p>
                    </ThirdBlockElementsWrapper>
                    <ThirdBlockElementsWrapper>
                      <p id="name">Проєкти</p>
                      <p id="value">{item.project_count || 0}</p>
                    </ThirdBlockElementsWrapper>
                    <ThirdBlockElementsWrapper>
                      <p id="name">Роль</p>
                      <div id="icon-wrapper">
                        <IconSprite
                          icon={
                            commonVariants.role.find((searchItem) => searchItem.name === item.speciality?.title)
                              ?.icon || commonVariants.role.find((item) => item.name === 'None')?.icon
                          }
                        />
                      </div>
                      <p id="value">{item.speciality?.title}</p>
                    </ThirdBlockElementsWrapper>
                  </>
                ) : (
                  <>
                    <ThirdBlockElementsWrapper>
                      <p id="name">Складість</p>
                      <div id="complexity">
                        {commonVariants.complexity.map((complexity, idx) => (
                          <>
                            <div id="complexity-icon" key={idx}>
                              <IconSprite
                                icon={
                                  commonVariants.status.find(
                                    (searchItem) => searchItem.name === (item as ProjectData).project_status.status
                                  )?.icon as IconType
                                }
                              />
                            </div>
                            <p id="value">{(item as ProjectData).project_status.status}</p>
                          </>
                        ))}
                      </div>
                    </ThirdBlockElementsWrapper>
                  </>
                )}
              </ThirdBlockWrapper>
            </Link>
          </ListItem>
        );
      })}
    </List>
    //  {isModalOpen && (
    //   <PopUp
    //     closeModalFunc={() => setModalOpen(null)}
    //     target="project"
    //     type="delete"
    //     yesCallback={() => onDelete(isModalOpen)}
    //     noCallback={() => setModalOpen(null)}
    //   />)}
  );
}

/*
    <>
      <List>
        {data &&
          data.map((item: ParticipantData | ProjectData) => {
            return (
              <ListItem key={item.id}>
                <Link href={type === 'participants' ? `participants/${item.id}` : `projects/${item.id}`}>
                  <FirstBlockWrapper>
                    <Button
                      variant="icon"
                      icon="trash"
                      func={(ev) => {
                        ev.preventDefault();
                        ev.stopPropagation();
                        setModalOpen(
                          `${type === 'participants' ? (item as ParticipantData).id : (item as ProjectData).title}`
                        );
                      }}
                    />
                    <Button
                      variant="icon"
                      icon="pencil"
                      func={(ev) => {
                        ev.preventDefault();
                        ev.stopPropagation();
                        router.push(`${type}/edit/${item.id}`);
                      }}
                    />
                    <p>
                      {type === 'participants'
                        ? (item as ParticipantData).type_participant
                        : (item as ProjectData).type_project.project_type}
                    </p>
                  </FirstBlockWrapper>
                  <SecondBlockWrapper type={type}>
                    <h2>
                      {type === 'participants'
                        ? `${(item as ParticipantData).last_name} ${(item as ParticipantData).first_name}`
                        : (item as ProjectData).title}
                    </h2>
                    <p>
                      {type === 'participants'
                        ? (item as ParticipantData).stack
                        : (item as ProjectData).participants_count}
                    </p>
                  </SecondBlockWrapper>
                  <ThirdBlockWrapper>
                    {type === 'participants' && (
                      <>
                        <ThirdBlockElementsWrapper>
                          <p id="name">Досвід</p>
                          <p id="value">{(item as ParticipantData).experience ? 'Так' : 'Ні'}</p>
                        </ThirdBlockElementsWrapper>
                        <ThirdBlockElementsWrapper>
                          <p id="name">Проєкти</p>
                          <p id="value">{item.project}</p>
                        </ThirdBlockElementsWrapper>
                        <ThirdBlockElementsWrapper>
                          <p id="name">Роль</p>
                          <div id="icon-wrapper">
                            <IconSprite
                              icon={commonVariants.role.find((searchItem) => searchItem.name === item.speciality)?.icon}
                            />
                            // !!!
                          </div>
                          <p id="value">{item.speciality}</p>
                          // !!!
                        </ThirdBlockElementsWrapper>
                      </>
                    )}
                    {type === 'projects' && (
                      <>
                        <ThirdBlockElementsWrapper>
                          <p id="name">Складість</p>
                          <div id="complexity">
                            {commonVariants.complexity.map((complexity, idx) => (
                              <div id="complexity-icon" key={idx}>
                                <IconSprite
                                  icon={
                                    complexity <= Number.parseInt((item as ProjectData).complexity.complexity)
                                      ? 'complexityActive'
                                      : 'complexityInactive'
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </ThirdBlockElementsWrapper>
                        <ThirdBlockElementsWrapper>
                          <p id="name">Стан</p>
                          <div id="icon-wrapper">
 */
