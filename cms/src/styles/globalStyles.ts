'use client';
import { css } from '@emotion/react';

import { reset } from './reset';

const common = css`
  html,
  body {
    font-style: normal;
  }
`;

export const globalStyles = css`
  ${common}
  ${reset}
`;
