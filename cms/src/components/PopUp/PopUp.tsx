import { useEffect } from 'react';

import { Button } from '../Button/Button';
import { IconSprite } from '../IconSprite/IconSprite';
import {
  ButtonsWrapper,
  ContentWrapper,
  NotificationWrapper,
  PopUpText,
  PopUpTitle,
  PopUpWindow,
  TextWrapperNotification,
  TextWrapperRemoval,
  Wrapper,
} from './PopUp.styles';

type PopUpProps = {
  type: 'delete' | 'success';
  target?: 'projects' | 'participants';
  mobileWidth?: string;
  yesCallback?: () => void;
  noCallback?: () => void;
  closeModalFunc?: () => void;
};

export function PopUp({ type, target, mobileWidth, closeModalFunc, yesCallback, noCallback }: PopUpProps) {
  useEffect(() => {
    if (type === 'success') {
      setTimeout(() => {
        closeModalFunc && closeModalFunc();
      }, 2000);
    }
    // eslint-disable-next-line
  }, []);

  const closeModal = () => {
    if (noCallback) noCallback();
    else closeModalFunc && closeModalFunc();
  };
  const copy = {
    projects: 'проєкт',
    participants: 'учасника',
  };
  return (
    <>
      <Wrapper onClick={closeModal} />
      <PopUpWindow borderColor={type === 'success' && '#29ca56'} mobileWidth={mobileWidth}>
        {type === 'delete' && (
          <>
            <ContentWrapper>
              <IconSprite icon="roundCheckmark" />
              <TextWrapperRemoval>
                <PopUpTitle>Видалити {target && copy[target]}</PopUpTitle>
                <PopUpText>Ви впевнені, що хочете видалити {target && copy[target]}?</PopUpText>
              </TextWrapperRemoval>
            </ContentWrapper>
            <ButtonsWrapper>
              <Button variant="accept" title="Так" func={yesCallback} icon="checkmark" />
              <Button variant="cancel" title="Скасувати" func={noCallback} icon="cross" />
            </ButtonsWrapper>
          </>
        )}
        {type === 'success' && (
          <NotificationWrapper>
            <IconSprite icon="roundCheckmark" />
            <TextWrapperNotification>
              <PopUpTitle color="#29CA56">Успіх!</PopUpTitle>
              <PopUpText>Ваші дані було успішно збережено.</PopUpText>
            </TextWrapperNotification>
          </NotificationWrapper>
        )}
      </PopUpWindow>
    </>
  );
}
