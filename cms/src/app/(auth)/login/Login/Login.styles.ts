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

export const ContainerCss = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
