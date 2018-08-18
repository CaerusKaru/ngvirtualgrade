import gql from 'graphql-tag';

export const CurrentUser = gql`
query {
  user {
    username
    groups
    term {
      term
    }
    manage {
      departments {
        courses {
          id
          name
          term {
            term
          }
        }
      }
    }
    admin {
      id
      name
      assignments {
        id
        name
        description
        type {
          type
        }
      }
      term {
        term
      }
    }
    grading {
      id
      name
      assignments {
        id
        name
        description
        type {
          type
        }
      }
      term {
        term
      }
    }
    courses {
      id
      name
      assignments {
        id
        name
        description
        type {
          type
        }
      }
      term {
        term
      }
    }
    instr {
      id
      name
      assignments {
        id
        name
        description
        type {
          type
        }
      }
      term {
        term
      }
    }
  }
}
`;
