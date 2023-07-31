import Image from 'next/image';

import round_checkmark from '../../../../../public/round-checkmark.svg';
import { ControlBtn } from '../ControlBtn/ControlBtn';
import { ButtonsWrapper, ContentWrapper, PopUpText, PopUpTitle } from './ConfirmRemoval.styles';

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
        <div>
          <PopUpTitle>Видалити {target}</PopUpTitle>
          <PopUpText>Ви впевнені, що хочете видалити {target}?</PopUpText>
        </div>
      </ContentWrapper>
      <ButtonsWrapper>
        <ControlBtn style={{ marginRight: '24px' }} type="accept" callback={yesCallback} />
        <ControlBtn type="cancel" callback={noCallback} />
      </ButtonsWrapper>
    </>
  );
}
