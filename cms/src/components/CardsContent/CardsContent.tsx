'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PopUp } from '../PopUp/PopUp';

import { commonVariants } from '../../hooks/commonVariants';
import { ParticipantData } from '../../redux/slices/participants/index';
import { ProjectData } from '../../redux/slices/projects/projects.slice';
import { Button } from '../Button/Button';
import { IconSprite, IconType } from '../IconSprite/IconSprite';
import {
  FirstBlockWrapper,
  List,
  ListItem,
  SecondBlockWrapper,
  ThirdBlockElementsWrapper,
  ThirdBlockWrapper,
} from './CardsContent.styles';
import { useState } from 'react';

type CardsContentType = {
  type: 'participants' | 'projects';
  data: ParticipantData[] | ProjectData[];
  onDelete: (title: string) => void;
};

export function CardsContent({ type, data, onDelete }: CardsContentType) {
  const [isModalOpen, setModalOpen] = useState(false);

  const router = useRouter();
  return (
    <List>
      {data &&
        data.map((item: ParticipantData | ProjectData) => {
          return (
            <>
              {isModalOpen && (
                <PopUp
                  closeModalFunc={() => setModalOpen(true)}
                  target="project"
                  type="delete"
                  yesCallback={() =>
                    onDelete(`${type === 'participants' ? (item as ParticipantData).id : (item as ProjectData).title}`)
                  }
                  noCallback={() => setModalOpen(false)}
                />
              )}
              <ListItem key={item.id}>
                <Link href={type === 'participants' ? `participants/${item.id}` : `projects/${item.id}`}>
                  <FirstBlockWrapper>
                    <Button
                      variant="icon"
                      icon="trash"
                      func={(ev) => {
                        ev.preventDefault();
                        ev.stopPropagation();
                        setModalOpen(true);
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
                            {/*!!!*/}
                          </div>
                          <p id="value">{item.speciality}</p>
                          {/*!!!*/}
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
            </>
          );
        })}
    </List>
  );
}
