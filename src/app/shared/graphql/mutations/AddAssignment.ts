import gql from 'graphql-tag';

export const AddAssignment = gql`
mutation {
  addAssignment (assignment: $input) {
    id
  }
}
`;
