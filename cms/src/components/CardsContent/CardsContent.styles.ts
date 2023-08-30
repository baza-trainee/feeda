import styled from '@emotion/styled';

import { colors, media } from '../../styles/theme';
import { breakpointDesktop } from '../../styles/vars';

export const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  justify-content: center;
  justify-items: center;
  gap: 16px;
  @media screen and (${media.tablet}) {
    grid-template-columns: 224px 224px;
  }
  @media screen and (${media.desktop}) {
    grid-template-columns: 286px 286px 286px;
  }
`;

export const ListItem = styled.li`
  width: 100%;
  max-width: 335px;
  border-radius: 8px;
  & > a {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 16px;
    border-radius: 8px;
    background-color: #fdf5dd;
    cursor: pointer;
    &:hover {
      background-color: #fde8af;
    }
    &:active {
      background-color: #fcdc7f;
    }
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
  & > p {
    width: min-content;
    padding: 8px 16px;
    font-size: 16px;
    font-weight: 500;
    border-radius: 4px;
    border: 1px solid ${colors.mainText};
    color: ${colors.mainText};
    @media screen and (${media.tablet}) and (max-width: ${breakpointDesktop}px) {
      width: 191px;
      margin-top: 8px;
      text-align: center;
    }
  }

  & > p#project-type-participant {
    font-weight: 400;
  }
`;

export const SecondBlockWrapper = styled.div<{ type: 'participants' | 'projects' }>`
  & > h2 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: ${({ type }) => (type === 'participants' ? 1 : 2)};
    text-overflow: ellipsis;
    word-wrap: break-word;
    font-weight: 600;
    font-size: 16px;
    color: ${colors.mainText};
    margin-bottom: 8px;

    @media screen and (${media.tablet}) and (max-width: ${breakpointDesktop}px) {
      ${({ type }) =>
        type === 'projects' &&
        'font-size: 14px;\
        font-weight: 500;\
        '}
    }
  }

  & > p {
    color: ${colors.mainPlaceholder};
    font-size: 16px;
    font-weight: 400;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 1;
  }
`;

export const ThirdBlockWrapper = styled.div`
  & > div.complexity-wrapper {
    margin-bottom: 8px;
  }
`;

export const ThirdBlockElementsWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  font-size: 16px;
  font-weight: 400;
  line-height: calc(24 / 16);
  color: ${colors.mainText};

  & > p#name {
    margin-right: auto;
  }
  & > p#value {
    font-weight: 500;
    line-height: calc(20 / 16);
  }

  & > div#icon-wrapper {
    display: flex;
    height: min-content;
    margin-right: 8px;
    padding: 8px;
    border-radius: 4px;
    background: #fcfcfc;
    & > svg {
      width: 8px;
      height: 8px;
    }
  }

  & > div#complexity {
    display: flex;
    & > svg {
      width: 16px;
      height: 16px;
      margin-right: 8px;
      &:last-of-type {
        margin-right: 0;
      }
    }
  }
`;
