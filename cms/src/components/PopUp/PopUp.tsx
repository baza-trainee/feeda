import { PopUpWindow, Wrapper } from './PopUp.styles';

const body = document.querySelector('body');

type PopUpProps = {
  children: React.ReactNode;
  closeModalFunc: () => void;
};

export function PopUp({ children, closeModalFunc }: PopUpProps) {
  body.style.overflow = 'hidden';

  const closeModal = () => {
    console.log('layout');
    body.style.overflow = 'auto';
    closeModalFunc();
  };

  return (
    <>
      <Wrapper onClick={closeModal}></Wrapper>
      <PopUpWindow>{children}</PopUpWindow>
    </>
  );
}
