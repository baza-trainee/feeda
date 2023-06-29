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
  display: flex;
  width: 795px;
  height: 834px;
  flex-direction: column;
  color: var(--neutral-900, #232323);
  font-size: 18px;
  font-family: Exo 2;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: 0.25px;
`;

export const AcceptBtn = styled.button`
  background-color: black;
  color: #fcfcfc;
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

export const InfoP = styled.p`
  margin-bottom: 10px;
`;

export const CloseDiv = styled.div`
  position: absolute;
  top: 40px;
  right: 40px;


`;
