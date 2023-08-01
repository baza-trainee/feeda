import { PopUpWindow, Wrapper } from './PopUp.styles';

// let body = null;
// if (document) {
const body = document.querySelector('body');
// }

type PopUpProps = {
  children: React.ReactNode;
  borderColor?: string;
  width?: string;
  closeModalFunc: () => void;
};

export function PopUp({ children, borderColor, width, closeModalFunc }: PopUpProps) {
  body.style.overflow = 'hidden';

  const closeModal = () => {
    console.log('layout');
    body.style.overflow = 'auto';
    closeModalFunc();
  };

  return (
    <>
      <Wrapper onClick={closeModal}></Wrapper>
      <PopUpWindow borderColor={borderColor} width={width}>
        {children}
      </PopUpWindow>
    </>
  );
}
