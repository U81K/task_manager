import { gql } from '@apollo/client';

export const TOKEN_AUTH = gql`
  mutation TokenAuth($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`;

export const CREATE_TASK = gql`
  mutation CreateTask(
    $title: String!,
    $description: String!,
    $completed: Boolean,
	$dueDate: Date!,
  ) {
    createTask(
      title: $title,
      description: $description,
      completed: $completed,
	  dueDate: $dueDate,
    ) {
      task {
        id
        title
      }
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id) {
      success
      message
    }
  }
`;


export const REGISTER_USER = gql`
mutation RegisterUser($username: String!, $password: String!) {
  registerUser(username: $username, password: $password) {
	success
	errors
  }
}
`;