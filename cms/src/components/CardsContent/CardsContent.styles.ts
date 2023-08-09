import styled from '@emotion/styled';

import { media } from '../../styles/theme';

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
  @media screen and (${media.tablet}) {
    max-width: 224px;
  }
  @media screen and (${media.desktop}) {
    max-width: 286px;
  }
`;
