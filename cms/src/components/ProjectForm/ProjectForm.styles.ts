import styled from '@emotion/styled';

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InputsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);

    > :first-child {
      grid-column: 1/3;
    }
  }
`;

export const FormControllers = styled.div`
  align-self: flex-end;
  margin-top: 58px;
  display: flex;
  gap: 24px;
`;
