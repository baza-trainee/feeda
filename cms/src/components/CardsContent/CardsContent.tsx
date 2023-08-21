'use client';

import { useDispatch } from 'react-redux';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { commonVariants } from '../../helpers/commonVariants';
import { deleteParticipant, ParticipantData } from '../../slices/participants/operations';
import { ProjectData } from '../../slices/projects/index';
import { Button } from '../Button/Button';
import { IconSprite } from '../IconSprite/IconSprite';
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
  fromSearch?: boolean;
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
                            commonVariants.role.find((searchItem) => searchItem.name === item.speciality.title)?.icon ||
                            commonVariants.role.find((item) => item.name === 'None')?.icon
                          }
                        />
                      </div>
                      <p id="value">{item.speciality.title}</p>
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
                                complexity <= Number.parseInt(item.complexity.complexity)
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
                          icon={commonVariants.status.find((searchItem) => searchItem.name === item.status)?.icon}
                        />
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
  );
}
