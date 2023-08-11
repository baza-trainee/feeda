import styled from '@emotion/styled';

import { colors } from '../../styles/theme';

export const Form = styled.form`
  & p#form-part-title {
    color: ${colors.mainText};
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 16px;
  }
  & div#titleAndButtonWrapper > p {
    margin-bottom: 8px;
  }
  & div#two-inputs-wrapper {
    margin-bottom: 25px;

    & div#input-wrapper {
      margin-bottom: 25px;
    }
  }
`;
