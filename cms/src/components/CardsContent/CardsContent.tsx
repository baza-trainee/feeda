'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { commonVariants } from '../../helpers/commonVariants';
import { deleteParticipant, ParticipantData } from '../../redux/participants/operations';
import { deleteProject } from '../../redux/projects/actions';
import { ProjectTeamState } from '../../redux/projects/projects.slice';
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
import { SelectStateIcon } from '../SelectField/SelectField.style';
import { ProjectDifficulty } from '../SelectField/lists';

type CardsContentType = {
  type: 'participants' | 'projects';
  data: ParticipantData[] | ProjectTeamState[];
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

  function isParticipantData(item: any): item is ParticipantData {
    return item && item.type === 'participants';
  }

  function isProjectTeamState(item: any): item is ProjectTeamState {
    return item && item.type === 'projects';
  }

  const onProjectDelete = (slug: string) => {
    dispatch(deleteProject(slug)).then(() => setShowPopUp(false));
  };

  return (
    <>
      <List>
        {data?.map((item: ParticipantData | ProjectTeamState) => {
          return (
            <ListItem key={item.id}>
              <Link href={isParticipantData(item) ? `/participants/${item.id}` : `/projects/${item.slug}`}>
                <FirstBlockWrapper>
                  <Button
                    variant="icon"
                    icon="trash"
                    func={(ev) => {
                      ev.preventDefault();
                      ev.stopPropagation();
                      setShowPopUp(isParticipantData(item) ? item.id : item.slug);
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
                    {(item as ParticipantData)?.type || (item as ProjectTeamState).type}
                  </p>
                </FirstBlockWrapper>
                <SecondBlockWrapper type={type}>
                  {isParticipantData(item) ? (
                    <>
                      <h2 title={`${item.last_name} ${item.first_name}`}>
                        {item.last_name} {item.first_name}
                      </h2>
                      <p title={item.stack}>{item.stack || 'None'}</p>
                    </>
                  ) : (
                    <>
                      <h2 title={item.title}>{item.title}</h2>
                      <p title={item.count_participants.toString()}>
                        {item.count_participants} {projectParticipantsEnding(Number(item.count_participants))}
                      </p>
                    </>
                  )}
                </SecondBlockWrapper>
                <ThirdBlockWrapper>
                  {isParticipantData(item) ? (
                    <>
                      <ThirdBlockElementsWrapper>
                        <p id="name">Досвід</p>
                        <p id="value">{item.experience ? 'Так' : 'Ні'}</p>
                      </ThirdBlockElementsWrapper>
                      <ThirdBlockElementsWrapper>
                        <p id="name">Проєкти</p>
                        <p id="value">{item.count_projects}</p>
                      </ThirdBlockElementsWrapper>
                      <ThirdBlockElementsWrapper>
                        <p id="name">Роль</p>
                        <div id="icon-wrapper">
                          <IconSprite
                            icon={
                              commonVariants.role.find((searchItem) => searchItem.name === item.role)?.icon ||
                              (commonVariants.role.find((item) => item.name === 'None')?.icon as IconType)
                            }
                          />
                        </div>
                        <p id="value">{item.role || 'None'}</p>
                      </ThirdBlockElementsWrapper>
                    </>
                  ) : (
                    <>
                      <ThirdBlockElementsWrapper className="complexity-wrapper">
                        <p id="name">Складість</p>
                        <div id="complexity">
                          <ProjectDifficulty type={item.complexity} isCardItem />
                        </div>
                      </ThirdBlockElementsWrapper>
                      <ThirdBlockElementsWrapper>
                        <p id="name">Стан</p>
                        <div id="icon-wrapper">
                          <SelectStateIcon type={item.status} />
                        </div>
                        <p id="value">{item.status}</p>
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
          yesCallback={() => onProjectDelete(showPopUp.toString())}
        />
      )}
      <></>
    </>
  );
}
