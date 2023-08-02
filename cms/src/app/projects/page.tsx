'use client';
/** @jsxImportSource @emotion/react */
import {
  ProjectsContainer,
  ProjectWrapper,
  ProjectsBar,
  NameItem,
  TypeItem,
  Members,
  Dific,
  StateItem,
  EditItem,
  DeleteItem,
} from './projects.styles';

const mockData = [
  {
    name: 'Сайт притулку для вуличних тварин Murrfecto',
    type: 'Безкоштовний',
    members: '7 людей',
    dificulty: '0 0 0 0 0',
    state: '0',
    test1: 'add',
    test2: 'del',
  },
  {
    name: 'Сайт притулку для вуличних тварин Murrfecto',
    type: 'Безкоштовний',
    members: '7 людей',
    dificulty: '0 0 0 0 0',
    state: '0',
    test1: 'add',
    test2: 'del',
  },
  {
    name: 'Сайт притулку для вуличних тварин Murrfecto',
    type: 'Безкоштовний',
    members: '7 людей',
    dificulty: '0 0 0 0 0',
    state: '0',
    test1: 'add',
    test2: 'del',
  },
  {
    name: 'Сайт притулку для вуличних тварин Murrfecto',
    type: 'Безкоштовний',
    members: '7 людей',
    dificulty: '0 0 0 0 0',
    state: '0',
    test1: 'add',
    test2: 'del',
  },
];

export default function Projects({ data = mockData }) {
  return (
    <main>
      projects
      <ProjectsContainer>
        <ProjectsBar>
          <NameItem>Назва</NameItem>
          <TypeItem>Тип проекту</TypeItem>
          <Members>К-ть учасників</Members>
          <Dific>Складність проекту</Dific>
          <StateItem>Cтан</StateItem>
          <EditItem>
            <div // change to Button Component
              style={{
                width: '40px',
                height: '40px',
                border: '1px solid black',
                borderRadius: '4px',
              }}
            />
          </EditItem>
          <DeleteItem>
            <div // change to Button Component
              style={{
                width: '40px',
                height: '40px',
                border: '1px solid black',
                borderRadius: '4px',
              }}
            />
          </DeleteItem>
        </ProjectsBar>
        {data.map((item, index) => (
          <ProjectWrapper key={index}>
            <NameItem>{item.name}</NameItem>
            <TypeItem>{item.type}</TypeItem>
            <Members>{item.members}</Members>
            <Dific>{item.dificulty}</Dific>
            <StateItem>{item.state}</StateItem>
            <EditItem>
              {' '}
              <div // change to Button Component
                style={{
                  width: '40px',
                  height: '40px',
                  border: '1px solid black',
                  borderRadius: '4px',
                }}
              />
            </EditItem>
            <DeleteItem>
              {' '}
              <div // change to Button Component
                style={{
                  width: '40px',
                  height: '40px',
                  border: '1px solid black',
                  borderRadius: '4px',
                }}
              />
            </DeleteItem>
          </ProjectWrapper>
        ))}
      </ProjectsContainer>
    </main>
  );
}
