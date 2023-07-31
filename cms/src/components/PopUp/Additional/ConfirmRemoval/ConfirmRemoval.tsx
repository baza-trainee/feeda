import Image from 'next/image';

import round_checkmark from '../../../../../public/round-checkmark.svg';
import { ControlBtn } from '../ControlBtn/ControlBtn';
import { PopUpText } from '../PopUpText/PopUpText';
import { PopUpTitle } from '../PopUpTitle/PopUpTitle';
import { ButtonsWrapper, ContentWrapper, TextWrapper } from './ConfirmRemoval.styles';

type ConfirmRemovalProps = {
  yesCallback: () => void;
  noCallback: () => void;
  target: 'проєкт' | 'учасника';
};

export function ConfirmRemoval({ yesCallback, noCallback, target }: ConfirmRemovalProps) {
  return (
    <>
      <ContentWrapper>
        <Image style={{ marginRight: 16 }} src={round_checkmark} alt="Галочка" />
        <TextWrapper>
          <PopUpTitle>Видалити {target}</PopUpTitle>
          <PopUpText>Ви впевнені, що хочете видалити {target}?</PopUpText>
        </TextWrapper>
      </ContentWrapper>
      <ButtonsWrapper>
        <ControlBtn style={{ marginRight: '24px' }} type="accept" callback={yesCallback} />
        <ControlBtn type="cancel" callback={noCallback} />
      </ButtonsWrapper>
    </>
  );
}
