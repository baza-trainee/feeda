import styled from '@emotion/styled';

export const MainTitle = styled.h1`
  font-weight: 600;
  font-size: 32px;
  white-space: nowrap;
  color: #121212;

  @media screen and (min-width: 768px) {
    font-size: 45px;
    font-weight: 700;
  }
`;

export const SecondaryTitle = styled.h1<{ small: boolean }>`
  font-weight: 600;
  font-size: 28px;
  white-space: nowrap;
  ${({ small }) =>
    small &&
    `
      font-weight: 700;
      font-size: 22px;
  `}

  @media screen and (min-width: 1280px) {
    font-size: 32px;
  }
`;
