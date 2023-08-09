'use client';

import { Button } from '../../Button/Button';
import { IconSprite } from '../../IconSprite/IconSprite';
import {
  FirstBlockWrapper,
  ParticipationType,
  SecondBlockWrapper,
  ThirdBlockElementsWrapper,
  ThirdBlockWrapper,
} from './Card.styles';

export function Card() {
  return (
    <>
      <FirstBlockWrapper>
        <Button variant="icon" icon="trash" />
        <Button variant="icon" icon="pencil" />
        <ParticipationType>Платний</ParticipationType>
      </FirstBlockWrapper>
      <SecondBlockWrapper>
        <h2>Константінов Констянтин</h2>
        <p>HTML,CSS,TS,Node</p>
      </SecondBlockWrapper>
      <ThirdBlockWrapper>
        <ThirdBlockElementsWrapper>
          <p id="name">Досвід</p>
          <p id="value">Так</p>
        </ThirdBlockElementsWrapper>
        <ThirdBlockElementsWrapper>
          <p id="name">Проєкт</p>
          <p id="value">2</p>
        </ThirdBlockElementsWrapper>
        <ThirdBlockElementsWrapper>
          <p id="name">Роль</p>
          <div id="icon-wrapper">
            <IconSprite icon="design" />
          </div>
          <p id="value">Design</p>
        </ThirdBlockElementsWrapper>
      </ThirdBlockWrapper>
    </>
  );
}
