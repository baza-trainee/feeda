'use client';
import React, { ReactNode } from 'react';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { media } from '~/src/styles/theme';

export function LayoutContainer({ children }: { children: ReactNode }) {
  return (
    <div
      css={css`
        display: flex;
        gap: 1.5rem;
        max-width: 1280px;
        min-height: 100vh;
        margin: 0 auto;
        padding: 0 32px;
        padding-bottom: 48px;
        @media screen and (${media.tablet}) {
          padding-bottom: 60px;
          gap: 1rem;
        }
      `}
    >
      {children}
    </div>
  );
}
