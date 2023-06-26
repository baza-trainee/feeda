"use client";

import Container from "components/Container/Container";
import React, { useState } from "react";
import VerifyHome from "components/VerifyHome/VerifyHome";
import ConstructHome from "components/ConstructHome/ConstructHome";
import { Button,Wrapper,Div } from "components/ConstructHome/ConstructHome.styles";

export const metadata = {
  title: "Feeda",
  description: "Candidate's application",
};

export default function Home() {
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick(true);
    console.log(click);
  };

  return (
    <Div>
      <Container>
        {click ? <VerifyHome />
         : (
          <Wrapper>
           <ConstructHome/>
            <Button onClick={handleClick}>Подати заявку</Button>
          </Wrapper>
        )}
      </Container>
    </Div>
  );
}
