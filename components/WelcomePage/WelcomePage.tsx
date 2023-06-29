"use client";

import React, { useState } from "react";
import { Button , Wrapper, Div, } from "components/Condition/Condition.styles";
import Agreement from "components/Agreement/Agreement";
import Container from "components/Container/Container";
import Condition from "components/Condition/Condition";

const WelcomePage = () => {
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick(true);
    console.log(click);
  };

  return (
    <Div>
      <Container>
        {click ? (
          <Agreement />
        ) : (
          <Wrapper>
            <Condition />
            <Button onClick={handleClick}>Подати заявку</Button>
          </Wrapper>
        )}
      </Container>
    </Div>
  );
};

export default WelcomePage;
