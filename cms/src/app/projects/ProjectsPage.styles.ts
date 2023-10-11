import styled from '@emotion/styled';

import { theme } from '../../styles/theme';

export const ProjectsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;

export const AddButtonWrapper = styled.div`
  width: 100%;

  @media screen and (${theme.media.tablet}) {
    max-width: 180px;
  }
  align-self: flex-end;
`;
