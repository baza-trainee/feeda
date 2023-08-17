import styled from '@emotion/styled';

import { colors, media } from '../../styles/theme';

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #fcfcfc66;
`;
export const PopUpWindow = styled.div<{ borderColor: false | '#29ca56'; mobileWidth: string | undefined }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${({ mobileWidth }) => mobileWidth || ' 329px'};
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

export const PopUpText = styled.p`
  color: ${colors.mainText};
  font-size: 16px;
  margin-left: auto;
`;

export const PopUpTitle = styled.p<{ color?: string }>`
  color: ${({ color }) => color || colors.mainText};
  font-size: 22px;
  font-weight: 700;
  width: max-content;
`;

export const ContentWrapper = styled.div`
  display: flex;
  margin-bottom: 16px;
  width: fit-content;
  & > svg {
    height: fit-content;
    margin-right: 16px;
  }
`;

export const TextWrapperRemoval = styled.div`
  width: 211px;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  width: fit-content;
`;

export const NotificationWrapper = styled.div`
  display: flex;
  width: fit-content;
  & > svg {
    height: 24px;
    width: 24px;
    margin-right: 16px;
    color: #29ca56;
  }
`;

export const TextWrapperNotification = styled.div`
  width: 152px;
  @media screen and (${media.tablet}) {
    width: 265px;
  }
`;
