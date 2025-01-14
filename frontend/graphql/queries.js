import { gql } from '@apollo/client';

export const GET_TASKS = gql`
  query {
    tasks {
      id
      title
      description
      completed
      dueDate
    }
  }
`;


export const GET_TASK = gql`
  query GetTask($id: ID!) {
    task(id: $id) {
      id
      title
      description
      completed
      dueDate
    }
  }
`;