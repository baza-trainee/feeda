import Image from 'next/image';

import round_checkmark from '../../../../../public/round-checkmark.svg';
import { PopUpText } from '../PopUpText/PopUpText';
import { PopUpTitle } from '../PopUpTitle/PopUpTitle';
import { TextWrapper, Wrapper } from './SuccessNotification.styles';

export function SuccessNotification() {
  return (
    <Wrapper>
      <Image style={{ marginRight: 16, fill: 'green' }} src={round_checkmark} alt="Галочка" />
      <TextWrapper>
        <PopUpTitle color="#29CA56">Успіх!</PopUpTitle>
        <PopUpText>Ваші дані було успішно збережено.</PopUpText>
      </TextWrapper>
    </Wrapper>
  );
}
