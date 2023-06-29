"use client";
import { reset } from "./reset";
import { css } from "@emotion/react";
import { theme } from "./theme";

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
