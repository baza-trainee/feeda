'use client';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';

import { Sidebar } from './Sidebar';
import { ModalWindow, Overlay } from './Sidebar.style';

export function SidebarModal({ isOpen, closeModal }: { isOpen: boolean; closeModal: () => void }) {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  const ModalContent = (
    <Overlay>
      <ModalWindow>
        <Sidebar closeModal={closeModal} />
      </ModalWindow>
    </Overlay>
  );

  return ReactDOM.createPortal(ModalContent, document.getElementById('modal-root')!);
}
