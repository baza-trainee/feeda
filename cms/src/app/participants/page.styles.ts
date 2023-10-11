import styled from '@emotion/styled';

import { colors, media } from '../../../src/styles/theme';

export const Wrapper = styled.div`
  width: 100%;
  & > a {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    width: 100%;
    margin-bottom: 24px;
    border: 1px solid #232323;
    padding: 16px;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 600;
    color: ${colors.mainText};
    transition: all 250ms ease-in;

    &:hover {
      background-color: #fdf5dd;
      color: #232323;
    }
    &:focus {
      background-color: #232323;
      color: #fdf5dd;
    }

    @media screen and (${media.tablet}) {
      width: fit-content;
      margin-left: auto;
    }
  }
`;
