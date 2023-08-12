import styled from '@emotion/styled';

import { colors, media } from '../../styles/theme';

export const Form = styled.form`
  & button {
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0.15px;
  }
  & p#form-part-title {
    color: ${colors.mainText};
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 16px;
  }
  & div#titleAndButtonWrapper {
    margin-bottom: 16px;
    & > p {
      margin-bottom: 8px;
    }
    @media screen and (${media.tablet}) {
      display: flex;
      align-items: center;
      justify-content: space-between;
      & > p {
        margin-bottom: 0;
      }
      & > button {
        width: fit-content;
      }
    }
  }
  & div#two-inputs-wrapper {
    margin-bottom: 24px;
    &:last-of-type {
      margin-bottom: 0;
    }
    & div#input-wrapper:first-of-type {
      margin-bottom: 24px;
    }
    @media screen and (${media.desktop}) {
      display: flex;
      align-items: center;
      & > div#input-wrapper {
        width: 100%;
      }
      & > div#input-wrapper:first-of-type {
        margin-bottom: 0;
        margin-right: 24px;
      }
      &.stackAndRole > div#input-wrapper:last-of-type {
        width: 183px !important;
      }
    }
  }
  & div#form-part-title {
    margin-bottom: 32px;
  }
`;
