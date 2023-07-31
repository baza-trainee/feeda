import styled from '@emotion/styled';

import { colors } from '../../../../styles/theme';

export const ContentWrapper = styled.div`
  display: flex;
  margin-bottom: 16px;
  width: fit-content;
`;

export const PopUpTitle = styled.p`
  color: ${colors.mainText};
  font-size: 22px;
  font-weight: 700;
`;

export const PopUpText = styled.p`
  color: #262626;
  font-size: 16px;
  width: 211px;
  margin-left: auto;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  width: fit-content;
`;
