'use client';

import React, { useState, useEffect,useRef  } from 'react';

import Image from 'next/image';

import {
  AcceptBtn,
  CloseDiv,
  Container,
  Header,
  InfoP,
  ModalOverplay,
  ModalContent,
} from './Agreement.styles';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Agreement: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [next, setNext] = useState(false);
  const modalContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleClickKey);

    return () => {
      document.removeEventListener('keydown', handleClickKey);
    };
  }, [onClose]);
  
  useEffect(() => {
    const modalContent = modalContentRef.current;

    const handleResize = () => {
      if (modalContent?.scrollHeight && modalContent?.clientHeight) {
        if (modalContent.scrollHeight > modalContent.clientHeight) {
          modalContent.style.overflowY = 'auto';
        } else {
          modalContent.style.overflowY = 'hidden';
          modalContent.style.background = "white"
        }
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  if (!isOpen) {
    return null;
  }

  const handleClick = () => {
    setNext(true);
  };

  return (
    <>
      <ModalOverplay onClick={onClose}>
        <ModalContent ref={modalContentRef} onClick={(e) => e.stopPropagation()} >
          {next ? (
            <Header>Умови та правила участі на проєкті</Header>
          ) : (
            <Header>Згода на обробку персональних даних</Header>
          )}
          <Container>
            <ol className="">
              <li>
                <InfoP>
                  1. Навчальний проект- платформа Baza Trainee Ukraine надає можливість кожному, хто хоче набути
                  практики в ІТ діяльності, взяти участь в створенні реальних проектів для соціальної сфери (благодійних
                  фондів, громадських організацій тощо).
                </InfoP>
              </li>
              <li>
                <InfoP>
                  2. Платформу створено перш за все для розробників-початківців, джуніорів, світчерів. Також ми
                  запрошуємо до співпраці менторів, які можуть допомогти команді на будь-якому етапі створення проекту.
                  Ми також відкриті партнерству з компаніями, де ми можемо бути корисні один одному.
                </InfoP>
              </li>
              <li>
                <InfoP>
                  3. Ціль платформи – промоція учасника через волонтерську участь в справжньому проекті і його
                  працевлаштування.
                </InfoP>
              </li>
              <li>
                <InfoP>
                  4. Мета платформи – розвиток сфери ІТ послуг в Україні через залучення нових працівників – тих, хто
                  обирає першу професію для роботи в ІТ, і тих, хто міняє професію на спеціальність в ІТ.
                </InfoP>
              </li>
              <li>
                <InfoP>
                  5. Місія платформи – формування репутації України як країни професіоналів ІТ розробки на світовому
                  рівні, а також ІТ сфера як одна з вагомих сфер діяльності в економіці країни через залучення до роботи
                  будь-яких верств населення без обмежень.
                </InfoP>
              </li>
              <li>
                <InfoP>
                  6. Результатом роботи команди є реальна розробка, яка продовжить життя після закінчення проекту.
                </InfoP>
              </li>
              <li>
                <InfoP>7. Участь в проекті відбувається на волонтерських засадах.</InfoP>
              </li>
              <li>
                <InfoP>8. Участь в проекті є командною роботою, тому ми просимо поважати роботу ваших колег.</InfoP>
              </li>
              <li>
                <InfoP>
                  9. Волонтер може вийти з проекту в будь-який момент без пояснення причин, але попередивши про вихід.
                  Матеріали, код, зразки дизайну в цьому випадку залишаються на проекті. Платформа в свою чергу надає
                  рекомендацію кожному учаснику-волонтеру, який можна використати на наступних співбесідах.
                </InfoP>
              </li>
              <li>
                <InfoP>
                  10. Проекти виконуються виключно для офіційно зареєстрованих НГО із збором внесків на розрахункові
                  рахунки організацій. Збір на приватні картки виключається.
                </InfoP>
              </li>
              <li>
                <InfoP>
                  11. Волонтер, який пропонує активність для поліпшення роботи платформи або проекту замовника, погоджує
                  його з замовником і стає виконавцем такої активності.
                </InfoP>
              </li>
              <li>
                <p>Україна, Київ, квітень 2023</p>
              </li>
            </ol>
          </Container>
          <AcceptBtn onClick={handleClick}>Приймаю</AcceptBtn>
          <CloseDiv>
            <Image src="/close.svg" width={24} height={24} alt="Close" onClick={onClose} />
          </CloseDiv>
        </ModalContent>
      </ModalOverplay>
    </>
  );
};

export default Agreement;
