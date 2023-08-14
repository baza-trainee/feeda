'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { commonVariants } from '../../hooks/commonVariants';
import { ParticipantData } from '../../slices/participants/index';
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
  type: 'participants' | 'projects';
  data: ParticipantData[] | ProjectData[];
};

export function CardsContent({ type, data }: CardsContentType) {
  const router = useRouter();
  return (
    <List>
      {data.map((item: ParticipantData | ProjectData) => {
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
                <p>{item.type_participant.title}</p>
              </FirstBlockWrapper>
              <SecondBlockWrapper type={type}>
                <h2>{type === 'participants' ? `${item.last_name} ${item.first_name}` : item.title}</h2>
                <p>{type === 'participants' ? item.stack : `${item.participants} Учасник`}</p>
              </SecondBlockWrapper>
              <ThirdBlockWrapper>
                {type === 'participants' && (
                  <>
                    <ThirdBlockElementsWrapper>
                      <p id="name">Досвід</p>
                      <p id="value">{item.experience ? 'Так' : 'Ні'}</p>
                    </ThirdBlockElementsWrapper>
                    <ThirdBlockElementsWrapper>
                      <p id="name">Проєкти</p>
                      <p id="value">{item.project?.length || 0}</p>
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
