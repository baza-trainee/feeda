'use client';
import React, { ReactNode } from 'react';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export function LayoutContainer({ children }: { children: ReactNode }) {
  return (
    <div
      css={css`
        max-width: 1280px;
        min-height: 100vh;
        margin: 0 auto;
        padding: 0 32px;
      `}
    >
      {children}
    </div>
  );
}
