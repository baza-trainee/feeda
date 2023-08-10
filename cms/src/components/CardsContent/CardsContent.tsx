'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Link from 'next/link';

import { fetchMembers } from '../../slices/members/index';
import { Button } from '../Button/Button';
import { IconSprite } from '../IconSprite/IconSprite';
import { listContent } from '../Input/DropdownMarkup';
import {
  FirstBlockWrapper,
  List,
  ListItem,
  ParticipationType,
  SecondBlockWrapper,
  ThirdBlockElementsWrapper,
  ThirdBlockWrapper,
} from './CardsContent.styles';

type CardsContentType = {
  type: 'members' | 'projects';
};

export function CardsContent({ type }: CardsContentType) {
  const dispatch = useDispatch();
  const membersList = useSelector((state: any) => state.members.list);
  useEffect(() => {
    dispatch(fetchMembers());
  }, []);
  console.log(membersList);

  return (
    <List>
      {membersList.map((item: any) => {
        return (
          <ListItem key={item.id}>
            <Link href="/">
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
                  }}
                />
                <ParticipationType>{item.type_participant}</ParticipationType>
              </FirstBlockWrapper>
              <SecondBlockWrapper>
                <h2>
                  {item.last_name} {item.first_name}
                </h2>
                <p>{item.stack}</p>
              </SecondBlockWrapper>
              <ThirdBlockWrapper>
                {type === 'members' && (
                  <>
                    <ThirdBlockElementsWrapper>
                      <p id="name">Досвід</p>
                      <p id="value">{item.experience ? 'Так' : 'Ні'}</p>
                    </ThirdBlockElementsWrapper>
                    <ThirdBlockElementsWrapper>
                      <p id="name">Проєкт</p>
                      <p id="value">{item.project}</p>
                    </ThirdBlockElementsWrapper>
                    <ThirdBlockElementsWrapper>
                      <p id="name">Роль</p>
                      <div id="icon-wrapper">
                        <IconSprite
                          icon={listContent.role.find((searchItem) => searchItem.name === item.speciality)?.icon}
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
                      <p id="value">!!!!!</p>
                    </ThirdBlockElementsWrapper>
                    <ThirdBlockElementsWrapper>
                      <p id="name">Стан</p>
                      <div id="icon-wrapper">
                        <IconSprite icon="design" />
                      </div>
                      <p id="value">Design</p>
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
