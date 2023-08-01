import { PopUp } from '../../PopUp';
import { ControlBtn } from '../ControlBtn/ControlBtn';
import { PopUpText } from '../PopUpText/PopUpText';
import { PopUpTitle } from '../PopUpTitle/PopUpTitle';
import { RoundCheckmark } from '../SvgComponents/RoundCheckmark';
import { ButtonsWrapper, ContentWrapper, iconStyles, TextWrapper } from './ConfirmRemoval.styles';

type ConfirmRemovalProps = {
  yesCallback: () => void;
  noCallback: () => void;
  closeModalFunc: () => void;
  target: 'проєкт' | 'учасника';
};

export function ConfirmRemoval({ yesCallback, noCallback, closeModalFunc, target }: ConfirmRemovalProps) {
  return (
    <PopUp closeModalFunc={closeModalFunc}>
      <ContentWrapper>
        <RoundCheckmark css={[iconStyles]} />
        <TextWrapper>
          <PopUpTitle>Видалити {target}</PopUpTitle>
          <PopUpText>Ви впевнені, що хочете видалити {target}?</PopUpText>
        </TextWrapper>
      </ContentWrapper>
      <ButtonsWrapper>
        <ControlBtn style={{ marginRight: '24px' }} type="accept" callback={yesCallback} />
        <ControlBtn type="cancel" callback={noCallback} />
      </ButtonsWrapper>
    </PopUp>
  );
}
