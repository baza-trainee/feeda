"use client";

import React, { useState } from "react";
import { Button , Wrapper, Div, } from "components/ConstructHome/ConstructHome.styles";
import Agreement from "components/Agreement/Agreement";
import Container from "components/Container/Container";
import ConstructHome from "components/ConstructHome/ConstructHome";

const Welcome = () => {
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
            <ConstructHome />
            <Button onClick={handleClick}>Подати заявку</Button>
          </Wrapper>
        )}
      </Container>
    </Div>
  );
};

export default Welcome;
