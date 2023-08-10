import styled from '@emotion/styled';

import { colors, media } from '../../styles/theme';
import { breakpointDesktop } from '../../styles/vars';

export const List = styled.ul`
  display: grid;
  width: fit-content;
  grid-template-columns: repeat(1, 1fr);
  justify-content: center;
  justify-items: center;
  margin: 0 auto !important;
  gap: 16px;
  @media screen and (${media.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (${media.desktop}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 335px;
  gap: 24px;
  padding: 24px 16px;
  border-radius: 8px;
  background-color: #fdf5dd;
  cursor: pointer;
  &:hover {
    background-color: #fde8af;
  }
  &:active {
    background-color: #fcdc7f;
  }
  @media screen and (${media.tablet}) {
    max-width: 224px;
  }
  @media screen and (${media.desktop}) {
    max-width: 286px;
  }
`;

export const FirstBlockWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  & > button {
    margin-right: 8px;
    width: 40px;
  }
  & > button + button {
    margin-right: auto;
  }
  @media screen and (${media.tablet}) and (max-width: ${breakpointDesktop}px) {
    & > p {
      width: 191px;
      margin-top: 8px;
      text-align: center;
    }
  }
`;
export const ParticipationType = styled.p`
  width: min-content;
  padding: 8px 16px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 4px;
  border: 1px solid ${colors.mainText};
  color: ${colors.mainText};
`;

export const SecondBlockWrapper = styled.div`
  & > h2 {
    margin-bottom: 8px;
    color: ${colors.mainText};
    font-size: 24px;
    font-weight: 700;
    line-height: calc(30 / 24);
  }
  & > p {
    color: ${colors.mainPlaceholder};
    font-size: 16px;
    font-weight: 400;
  }
`;

export const ThirdBlockWrapper = styled.div``;

export const ThirdBlockElementsWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 400;
  line-height: calc(24 / 16);
  color: ${colors.mainText};
  margin-bottom: 8px;
  &:last-child {
    margin-bottom: 0;
  }
  & > p#name {
    margin-right: auto;
  }
  & > p#value {
    font-weight: 500;
  }
  & > div#icon-wrapper {
    display: flex;
    height: min-content;
    margin-right: 8px;
    padding: 8px;
    border-radius: 4px;
    background: #fcfcfc;
  }
`;
