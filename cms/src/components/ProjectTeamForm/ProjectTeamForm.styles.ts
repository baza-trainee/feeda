import styled from '@emotion/styled';
import { media } from '../../styles/theme';

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const FormTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media screen and (${media.tablet}) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

export const AddBntWrapper = styled.div`
  width: 100%;

  @media screen and (${media.tablet}) {
    max-width: 199px;
  }
`;

export const DelBtnWrapper = styled.div`
  > :first-child {
    height: 55px;
  }
`;

export const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const MemberCardWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 56px;
  column-gap: 24px;
  row-gap: 8px;
  align-items: end;

  > :nth-child(4) {
    grid-row: 1/2;
    grid-column: 2/3;
  }

  > :nth-child(2) {
    grid-column: 1/3;
  }

  > :nth-child(3) {
    grid-column: 1/3;
  }

  /// DESIGN??? breackpoint????
  @media screen and (${media.tablet}) {
    grid-template-columns: 1fr 184px 1fr 80px;

    > :nth-child(4) {
      grid-column: 4/5;
    }

    > :nth-child(2) {
      grid-column: 2/3;
    }
    > :nth-child(3) {
      grid-column: 3/4;
    }
  }
`;

export const FormControllers = styled.div`
  align-self: flex-end;
  margin-top: 58px;
  display: flex;
  gap: 24px;
`;
