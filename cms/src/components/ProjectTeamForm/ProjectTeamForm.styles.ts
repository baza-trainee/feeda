import styled from '@emotion/styled';

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const FormTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const AddBntWrapper = styled.div`
  width: 199px;
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
  grid-template-columns: 286px 184px 1fr 80px;
  gap: 24px;
  align-items: end;
`;

export const FormControllers = styled.div`
  align-self: flex-end;
  margin-top: 58px;
  display: flex;
  gap: 24px;
`;
