import { useEffect } from 'react';

import { PopUp } from '../../PopUp';
import { PopUpText } from '../PopUpText/PopUpText';
import { PopUpTitle } from '../PopUpTitle/PopUpTitle';
import { RoundCheckmark } from '../SvgComponents/RoundCheckmark';
import { iconStyles, TextWrapper, Wrapper } from './SuccessNotification.styles';

type SuccessNotificationProps = {
  closeModalFunc: () => void;
};

export function SuccessNotification({ closeModalFunc }: SuccessNotificationProps) {
  useEffect(() => {
    setTimeout(() => {
      closeModalFunc();
    }, 2000);
  }, []);

  return (
    <PopUp borderColor="#29CA56" width="256px" closeModalFunc={closeModalFunc}>
      <Wrapper>
        <RoundCheckmark css={[iconStyles]} stroke="#29ca56" />
        <TextWrapper>
          <PopUpTitle color="#29CA56">Успіх!</PopUpTitle>
          <PopUpText>Ваші дані було успішно збережено.</PopUpText>
        </TextWrapper>
      </Wrapper>
    </PopUp>
  );
}
