/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const FormCss = css`
  width: 100%;
  padding: 32px;
  box-sizing: border-box;
  max-width: 335px;
  border-radius: 16px;
  border: 1px solid #cecece;
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media (min-width: 768px) {
    max-width: 464px;
  }
  @media (min-width: 1200px) {
    max-width: 456px;
  }
`;

export const TitleCss = css`
  text-align: center;
`;

export const SubtitleCss = css`
  margin-top: 1rem;
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

export const ContainerCss = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const newPassContainerCss = css`
  gap: 32px;
`;
