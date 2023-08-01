import styled from '@emotion/styled';

import { media } from '../../styles/theme';

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #fcfcfc66;
  /* cursor: pointer; */
`;
export const PopUpWindow = styled.div<{ borderColor: string; width: string }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${({ width }) => width || ' 329px'};
  padding: 32px;
  border-radius: 16px;
  border: 1px solid ${({ borderColor }) => borderColor || '#cecece'};
  background: #fcfcfc;
  z-index: 2;
  box-shadow: 0px 8px 20px 0px rgba(0, 0, 0, 0.25);
  @media screen and (${media.tablet}) {
    width: fit-content;
  }
`;
