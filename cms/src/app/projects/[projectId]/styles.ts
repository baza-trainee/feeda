import styled from '@emotion/styled';

export const ProjectContainer = styled.form`
  padding: 32px 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;

export const NavContainer = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;

  @media screen and (min-width: 768px) {
    > :first-child {
      max-width: 108px;
    }

    > :nth-child(2) {
      max-width: 142px;
    }
  }

  @media screen and (min-width: 337px) {
    flex-wrap: nowrap;
  }
`;
