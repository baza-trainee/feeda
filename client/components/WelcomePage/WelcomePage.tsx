'use client';

import React, { useState } from 'react';

import Agreement from 'components/Agreement/Agreement';
import Condition from 'components/Condition/Condition';
import { Button,Wrapper } from 'components/Condition/Condition.styles';

const WelcomePage = () => {
  const [isOpen, setIsOpen] = useState(false);

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

export default WelcomePage;
