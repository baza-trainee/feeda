import styled from "@emotion/styled";

export const Header = styled.h2`
  display: flex;
  width: 800px;
  flex-direction: column;
  color: var(--neutral-1000, #121212);
  text-align: center;
  font-size: 45px;
  font-family: Exo 2;
  font-weight: 700;
  line-height: 52px;
`;

export const Container = styled.div`
  color: var(--neutral-900, #232323);
  display: flex;
  width: 1008px;
  height: 372px;
  flex-direction: column;
  font-size: 14px;
  font-family: Exo 2;
  line-height: 140%;
  letter-spacing: 0.25px;
  margin-top: 60px;
  padding-right: 56px;

  }
`;

export const AcceptBtn = styled.button`
  background-color: black;
  color: #FCFCFC;
  text-align: center;
  font-size: 22px;
  font-family: Exo 2;
  font-weight: 700;
  border: none;
  cursor: pointer;
  display: flex;
  height: 56px;
  padding: 16px 24px;
  align-items: center;
  gap: 16px;
  border-radius: 4px;
`;

export const VerifyCont = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 64px;
`;
