import Image from 'next/image';

import round_checkmark from '../../../../../public/round-checkmark.svg';
import { PopUpText } from '../PopUpText/PopUpText';
import { PopUpTitle } from '../PopUpTitle/PopUpTitle';
import { Wrapper } from './SuccessNotification.styles';

export function SuccessNotification() {
  return (
    <Wrapper>
      <Image style={{ marginRight: 16, fill: 'green' }} src={round_checkmark} alt="Галочка" />
      <div>
        <PopUpTitle>Успіх!</PopUpTitle>
        <PopUpText>Ваші дані було успішно збережено.</PopUpText>
      </div>
    </Wrapper>
  );
}
