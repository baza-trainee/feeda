import styled from '@emotion/styled';

import { media } from '../../../../styles/theme';

export const Wrapper = styled.div`
  display: flex;
  width: fit-content;
`;

export const TextWrapper = styled.div`
  width: 152px;
  @media screen and (${media.tablet}) {
    width: 265px;
  }
`;
