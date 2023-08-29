/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const RecoverFormCss = css`
  width: 100%;
  max-width: 335px;
  box-sizing: border-box;
  padding: 32px;
  border-radius: 16px;
  border: 1px solid #cecece;
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media (min-width: 768px) {
    max-width: 464px;
  }
  @media (min-width: 1280px) {
    max-width: 459px;
  }
`;

export const BlockCss = css`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const HeaderCss = css`
  width: 328px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  @media (min-width: 768px) {
    width: 395px;
  }
`;

export const SubtitleCss = css`
  padding: 0;
  margin: 0;
  width: 75.6%;
  color: #464646;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  @media (min-width: 768px) {
    font-size: 16px;
  }
`;

export const InputCss = css`
  height: 96px;
`;
