import styled from '@emotion/styled';

export const ProjectsContainer = styled.div`
  margin: 0 auto;
  max-width: 335px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: relative;

  @media (min-width: 768px) {
    max-width: 464px;
  }

  @media (min-width: 1280px) {
    max-width: 906px;
  }
`;

export const ProjectsBar = styled.div`
  font-size: 16px;
  font-weight: 600;
  row-gap: 2px;
  border-radius: 4px;
  display: grid;
  row-gap: 2px;
  background-color: #fcfcfc;
  grid-template-columns: 143px 34px 70px 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-areas:
    'name name name name'
    'type members members edit'
    'dificulty dificulty state delete';

  & > * {
    background-color: #fcdc7f;
  }

  @media (min-width: 768px) {
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 160px 112px 88px 46px 1fr;
    grid-template-areas:
      'name name name state edit'
      'type members dificulty dificulty delete';
  }

  @media (min-width: 1280px) {
    grid-template-columns: 322px 136px 104px 136px 96px 56px 56px;
    grid-template-rows: 1fr;
    grid-template-areas: 'name type members dificulty state edit delete';
  }
`;

export const ProjectWrapper = styled(ProjectsBar)`
  cursor: pointer;
  font-size: 14px;
  font-weight: 400;
  row-gap: 10px;

  & > * {
    background-color: transparent;
  }

  &:hover {
    background-color: #fdf4dd;
  }

  &:hover > * {
    background-color: #fdf4dd;
  }
`;

export const Item = styled.div`
  padding: 8px 0;
  height: 56px;
  display: flex;
  align-items: center;
  background-color: #fcdc7f;
`;

export const NameItem = styled(Item)`
  grid-area: name;
  border-radius: 4px;
  padding: 8px 16px 8px 16px;

  @media (min-width: 758px) {
    border-radius: 4px 0 0 4px;
  }

  @media (min-width: 1280px) {
    padding: 8px 32px 8px 16px;
  }
`;

export const TypeItem = styled(Item)`
  grid-area: type;
  border-radius: 4px 0 0 4px;
  padding: 8px 0 8px 24px;

  @media (min-width: 758px) {
    padding: 8px 32px 8px 16px;
    justify-content: center;
  }

  @media (min-width: 1280px) {
    padding: 8px 24px 8px 0;
  }
`;
export const Members = styled(Item)`
  grid-area: members;
  text-align: right;
  padding: 8px 0 8px 24px;

  @media (min-width: 758px) {
    padding: 8px 32px 8px 0;
    justify-content: center;
    text-align: center;
  }

  @media (min-width: 1280px) {
    padding: 8px 24px 8px 0;
  }
`;
export const Dific = styled(Item)`
  grid-area: dificulty;
  border-radius: 4px 0 0 4px;
  padding: 8px 0 8px 24px;

  @media (min-width: 758px) {
    padding: 8px 0 8px 0;
    justify-content: center;
    text-align: center;
    border-radius: 0;
  }

  @media (min-width: 1280px) {
    padding: 8px 24px 8px 0;
  }
`;

export const StateItem = styled(Item)`
  padding: 8px 0 8px 0;
  grid-area: state;
  text-align: right;
  justify-content: end;

  @media (min-width: 758px) {
    justify-content: start;
    padding: 8px 0 8px 0;
    text-align: left;
  }

  @media (min-width: 1280px) {
    text-align: left;
    justify-content: center;
    padding: 8px 56px 8px 0;
  }
`;

export const EditItem = styled(Item)`
  grid-area: edit;
  border-radius: 0 4px 4px 0;
  padding: 8px 0 8px 24px;

  @media (min-width: 758px) {
    padding: 8px 0 8px 0;
  }

  @media (min-width: 1280px) {
    padding: 8px 16 8px 0;
    border-radius: 0;
  }
`;

export const DeleteItem = styled(Item)`
  grid-area: delete;
  border-radius: 0 4px 4px 0;
  padding: 8px 0 8px 24px;

  @media (min-width: 758px) {
    padding: 8px 0 8px 0;
  }
`;
