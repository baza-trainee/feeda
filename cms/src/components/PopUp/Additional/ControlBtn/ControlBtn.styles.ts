import { css } from '@emotion/react';

export const btn = css`
  display: flex;
  align-items: center;
  font-size: 14px;
  line-height: 1;
  border: 0;
  padding: 5px 0;
  background-color: white;
  cursor: pointer;
  & > svg {
    width: 16px;
    height: 16px;
    margin-right: 8px;
  }
`;

export const btnAccept = css`
  color: #29ca56;
`;
export const btnCancel = css`
  color: #df4242;
`;
