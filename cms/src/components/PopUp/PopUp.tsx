import { PopUpWindow, Wrapper } from './PopUp.styles';

const body = document.querySelector('body');

type PopUpProps = {
  children: React.ReactNode;
  borderColor?: string;
  closeModalFunc: () => void;
};

export function PopUp({ children, borderColor, closeModalFunc }: PopUpProps) {
  body.style.overflow = 'hidden';

  const closeModal = () => {
    console.log('layout');
    body.style.overflow = 'auto';
    closeModalFunc();
  };

  return (
    <>
      <Wrapper onClick={closeModal}></Wrapper>
      <PopUpWindow borderColor={borderColor}>{children}</PopUpWindow>
    </>
  );
}
