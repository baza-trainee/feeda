import styled from '@emotion/styled';

import { colors } from '../../styles/theme';

export const Form = styled.form`
  & p#form-part-title {
    color: ${colors.mainText};
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 16px;
  }
  & > div#two-inputs-wrapper {
    margin-bottom: 25px;

    & input:first-of-type {
      margin-bottom: 25px;
    }
  }
`;
