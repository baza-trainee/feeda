import styled from '@emotion/styled';

import { theme } from '../../styles/theme';

export const ProjectsContainer = styled.div`
  display: flex;
  flex-direction: column;
  //max-width: 335px;
  gap: 24px;

  @media screen and (${theme.media.tablet}) {
    margin-left: 240px; // temporaty
    //max-width: 464px;
  }

  @media screen and (${theme.media.desktop}) {
    margin-left: 300px; // temporaty
    //max-width: 906px;
  }
`;

export const AddButtonWrapper = styled.div`
  width: 100%;

  @media screen and (${theme.media.tablet}) {
    max-width: 180px;
  }
  align-self: flex-end;
`;
