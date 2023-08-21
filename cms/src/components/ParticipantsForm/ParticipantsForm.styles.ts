import styled from '@emotion/styled';

import { colors, media } from '../../styles/theme';

export const Form = styled.form`
  & button {
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0.15px;
    @media screen and (${media.tablet}) {
      width: fit-content;
    }
  }
  & div#form-part {
    margin-bottom: 32px;
    &:last-of-type {
      margin-bottom: 52px;
      @media screen and (${media.tablet}) {
        margin-bottom: 68px;
      }
    }
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

  & div#project-wrapper {
    display: flex;
    align-items: flex-end;
    margin-bottom: 24px;
    & > div#input-wrapper {
      width: 100%;
      margin-right: 16px;
    }
    & > button {
      padding: 16px 28px;
      height: min-content;
      width: min-content;
    }
    &:last-of-type {
      margin-bottom: 0;
    }
  }

  & div#buttons-wrapper {
    & > a {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
      width: 100%;
      /* margin-bottom: 16px; */
      border: 0;
      padding: 16px;
      border-radius: 4px;
      font-size: 22px;
      font-weight: 700;
      color: ${colors.mainBtnText};
      background-color: #232323;
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

    & > button {
      line-height: 30.8px;
    }
    & > button:first-of-type {
      margin-bottom: 16px;
      font-size: 22px;
      font-weight: 700;
    }
    @media screen and (${media.tablet}) {
      display: flex;
      align-items: center;
      margin-left: auto;
      width: fit-content;
      & > button:first-of-type {
        margin-bottom: 0;
        margin-right: 16px;
      }
    }
    @media screen and (${media.desktop}) {
      & > button:last-of-type {
        font-size: 22px;
        font-weight: 400;
      }
    }
  }
`;
