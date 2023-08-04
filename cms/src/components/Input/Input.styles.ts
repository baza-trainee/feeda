import styled from '@emotion/styled';

export const InputWrapper = styled.div`
  border: solid 1px green;
  &:has(input:focused) {
    outline: 2px solid #939393;
  }
`;

export const InputComp = styled.input`
  color: red;
`;

export const LabelComp = styled.label`
  color: blue;
`;

export const SupportLabelComp = styled.label`
  color: pink;
`;
