'use client';

import React, { useState } from 'react';

import Agreement from 'components/Agreement/Agreement';
import Condition from 'components/Condition/Condition';
import { Button,Wrapper } from 'components/Condition/Condition.styles';

<<<<<<< HEAD:client/components/WelcomePage/WelcomePage.tsx
const WelcomePage = () => {
  const [isOpen, setIsOpen] = useState(false);
=======
export function StartPopUp () {
  const [click, setClick] = useState(false);
>>>>>>> develop:client/components/StartPopUp/StartPopUp.tsx

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
        <Wrapper>
          <Condition />
          <Button onClick={openModal}>Подати заявку</Button>
          <Agreement onClose={closeModal} isOpen={isOpen} />
        </Wrapper>  
  );
};
