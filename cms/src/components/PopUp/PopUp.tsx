import { useEffect } from 'react';

import { ControlBtn } from './Additional/ControlBtn/ControlBtn';
import { RoundCheckmark } from './Additional/SvgComponents/RoundCheckmark';
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
  target?: 'project' | 'member';
  borderColor?: string;
  mobileWidth?: string;
  yesCallback?: () => void;
  noCallback?: () => void;
  closeModalFunc: () => void;
};

export function PopUp({ type, target, borderColor, mobileWidth, closeModalFunc, yesCallback, noCallback }: PopUpProps) {
  useEffect(() => {
    if (type === 'success') {
      setTimeout(() => {
        closeModalFunc();
      }, 2000);
    }
    // eslint-disable-next-line
  }, []);

  const closeModal = () => {
    console.log('layout');
    closeModalFunc();
  };
  const copy = {
    project: 'проєкт',
    member: 'учасника',
  };
  return (
    <>
      <Wrapper onClick={closeModal} />
      <PopUpWindow borderColor={borderColor} mobileWidth={mobileWidth}>
        {type === 'delete' && (
          <>
            <ContentWrapper>
              <RoundCheckmark />
              <TextWrapperRemoval>
                <PopUpTitle>Видалити {copy[target]}</PopUpTitle>
                <PopUpText>Ви впевнені, що хочете видалити {copy[target]}?</PopUpText>
              </TextWrapperRemoval>
            </ContentWrapper>
            <ButtonsWrapper>
              <ControlBtn style={{ marginRight: '24px' }} type="accept" callback={yesCallback} />
              <ControlBtn type="cancel" callback={noCallback} />
            </ButtonsWrapper>
          </>
        )}
        {type === 'success' && (
          <NotificationWrapper>
            <RoundCheckmark stroke="#29ca56" />
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
