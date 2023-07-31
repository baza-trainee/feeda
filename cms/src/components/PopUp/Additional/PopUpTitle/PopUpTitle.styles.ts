import styled from '@emotion/styled';

import { colors } from '../../../../styles/theme';

export const Txt = styled.p<{ color: string }>`
  color: ${({ color }) => color || colors.mainText};
  font-size: 22px;
  font-weight: 700;
  width: max-content;
`;
