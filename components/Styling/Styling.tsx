'use client';
import { css, ClassNames } from '@emotion/react';
/** @jsxImportSource @emotion/react */

import React from 'react';
import { reactStyle, ObjectStyle } from './Styling.styles';
import './Styling.css';

export default function Styling() {
    return (
        <>
            <div css={reactStyle}>React Style</div>

            <div css={ObjectStyle}>Objec tStyle</div>

            <div
                css={css`
                    color: grey;
                    &:hover {
                        color: tomato;
                    }
                `}
            >
                String Style
            </div>

            <ClassNames>
                {({ css, cx }) => (
                    <div
                        className={cx(
                            'some-class',
                            css`
                                &:hover {
                                    color: tomato;
                                }
                            `
                        )}
                    >
                        ClassName Style
                    </div>
                )}
            </ClassNames>
        </>
    );
}
