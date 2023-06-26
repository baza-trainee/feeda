import { css } from "@emotion/react";

export const reactStyle = css`
    color: tomato;
`

export const ObjectStyle = {
    color: 'blue',
    '&:hover': {
        color: 'tomato'
    }
}
