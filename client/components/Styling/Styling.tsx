'use client';
/** @jsxImportSource @emotion/react */
import React from 'react';

import { ClassNames, css } from '@emotion/react';
import nextIcon from '@public/next.svg';
import Image from 'next/image';

import { ObjectStyle, reactStyle } from './Styling.styles';

import './Styling.css';

export default function Styling() {
  return (
    <>
      <Image src={nextIcon} width={100} height={100} alt="" />
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
