'use client';
import {fonts} from './fonts';
import { reset } from './reset';
import { css } from '@emotion/react';
import { theme } from './theme';

const common = css`
    html,
    body {
        font-family: ${theme.fonts.body.fontFamily};
        font-style: normal;
    }
`;

export const globalStyles = css`
    ${fonts}
    ${common}
    ${reset}
`;
