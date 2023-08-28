'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { commonVariants } from '../../helpers/commonVariants';
import { deleteParticipant, ParticipantData } from '../../redux/participants/operations';
import { deleteProject } from '../../redux/projects/actions';
import { ProjectData } from '../../redux/projects/projects.slice';
import { AppDispatch } from '../../redux/store/store';
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
  type: 'participants' | 'projects';
  data: ParticipantData[] | ProjectData[];
};
export function CardsContent({ type, data }: CardsContentType) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [showPopUp, setShowPopUp] = useState<boolean | number | string>(false);

  const projectParticipantsEnding = (count: number) => {
    const countLastDigit = count.toString()[count.toString().length - 1];
    return countLastDigit === '1'
      ? 'Учасник'
      : countLastDigit >= '2' && countLastDigit <= '4'
      ? 'Учасника'
      : 'Учасників';
  };
  console.log(data[0]);
  return (
    <>
      <List>
        {data?.map((item: ParticipantData | ProjectData) => {
          return (
            <ListItem key={item.id}>
              <Link href={type === 'participants' ? `/participants/${item.id}` : `/projects/${item.id}`}>
                <FirstBlockWrapper>
                  <Button
                    variant="icon"
                    icon="trash"
                    func={(ev) => {
                      ev.preventDefault();
                      ev.stopPropagation();
                      setShowPopUp(type === 'participants' ? item.id : (item as ProjectData).title);
                    }}
                  />
                  <Button
                    variant="icon"
                    icon="pencil"
                    func={(ev) => {
                      ev.preventDefault();
                      ev.stopPropagation();
                      router.push(`/${type}/edit/${item.id}`);
                    }}
                  />
                  <p id={type === 'projects' ? 'project-type-participant' : ''}>
                    {(item as ParticipantData).type_participant.title ||
                      (item as ProjectData).type_project.project_type}
                  </p>
                </FirstBlockWrapper>
                <SecondBlockWrapper type={type}>
                  {type === 'participants' ? (
                    <>
                      <h2 title={(item as ParticipantData).last_name}>{(item as ParticipantData).last_name}</h2>
                      <h2 title={(item as ParticipantData).first_name}>{(item as ParticipantData).first_name}</h2>
                      <p title={(item as ParticipantData).stack}>{(item as ParticipantData).stack || 'None'}</p>
                    </>
                  ) : (
                    <>
                      <h2 id="project-name" title={(item as ProjectData).title}>
                        {(item as ProjectData).title}
                      </h2>
                      <p title={(item as ProjectData).participants_count}>
                        {(item as ProjectData).participants_count}
                        {projectParticipantsEnding(Number((item as ProjectData).participants_count))}
                      </p>
                    </>
                  )}
                </SecondBlockWrapper>
                <ThirdBlockWrapper>
                  {type === 'participants' ? (
                    <>
                      <ThirdBlockElementsWrapper>
                        <p id="name">Досвід</p>
                        <p id="value">{(item as ParticipantData).experience ? 'Так' : 'Ні'}</p>
                      </ThirdBlockElementsWrapper>
                      <ThirdBlockElementsWrapper>
                        <p id="name">Проєкти</p>
                        <p id="value">{(item as ParticipantData).project_count}</p>
                      </ThirdBlockElementsWrapper>
                      <ThirdBlockElementsWrapper>
                        <p id="name">Роль</p>
                        <div id="icon-wrapper" className="participantIconWrapper">
                          <IconSprite
                            icon={
                              commonVariants.role.find(
                                (searchItem) => searchItem.name === (item as ParticipantData).speciality?.title
                              )?.icon || (commonVariants.role.find((item) => item.name === 'None')?.icon as IconType)
                            }
                          />
                        </div>
                        <p id="value">{(item as ParticipantData).speciality?.title}</p>
                      </ThirdBlockElementsWrapper>
                    </>
                  ) : (
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
                        <div id="icon-wrapper" className="projectIconWrapper">
                          <IconSprite
                            icon={
                              commonVariants.status.find(
                                (searchItem) => searchItem.name === (item as ProjectData).project_status.status
                              )?.icon as IconType
                            }
                          />
                        </div>
                        <p id="value">{(item as ProjectData).project_status.status}</p>
                      </ThirdBlockElementsWrapper>
                    </>
                  )}
                </ThirdBlockWrapper>
              </Link>
            </ListItem>
          );
        })}
      </List>
      {showPopUp && type === 'participants' && (
        <PopUp
          type="delete"
          target={type}
          noCallback={() => setShowPopUp(false)}
          yesCallback={() => dispatch(deleteParticipant(showPopUp.toString()))}
        />
      )}
      {showPopUp && type === 'projects' && (
        <PopUp
          type="delete"
          target={type}
          noCallback={() => setShowPopUp(false)}
          yesCallback={() => dispatch(deleteProject(showPopUp.toString()))}
        />
      )}
      <></>
    </>
  );
}
