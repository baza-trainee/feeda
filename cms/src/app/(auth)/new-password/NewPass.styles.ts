/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const NewPassFormCss = css`
  padding: 32px;
  width: 100%;
  max-width: 335px;
  box-sizing: border-box;
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
