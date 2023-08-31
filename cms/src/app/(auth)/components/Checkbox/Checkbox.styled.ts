import styled from '@emotion/styled';

export const Wrapper = styled.div`
  position: relative;
  font-size: 14px;
  line-height: normal;
  letter-spacing: 0.1px;
  padding: 1rem 0 1rem 3rem;
`;

export const Input = styled.input`
  cursor: pointer;
  opacity: 0;
  position: absolute;
  width: 18px;
  height: 18px;

  &:checked + #box::before {
    border: none;
    background-color: #ffbd00;
    background-image: url('/checkmark.svg');
    background-position: center center;
  }
`;

export const Box = styled.div`
  padding: 16px;
  position: absolute;
  top: 0;
  left: 0;

  &::before {
    display: block;
    content: '';
    border: 2px solid #232323;
    border-radius: 2px;
    width: 16px;
    height: 16px;
    cursor: pointer;

    transition: all 350ms ease-in-out;
  }

  &:hover {
    border-radius: 50%;
    background-color: rgba(206, 206, 206, 0.1);
  }

  input:checked + &:hover {
    border-radius: 50%;
    background-color: rgba(252, 220, 127, 0.2);
  }
  transition: all 350ms ease-in;
`;
