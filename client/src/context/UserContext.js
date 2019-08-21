import React from "react";
import { gql } from "apollo-boost";

const ME_QUERY = gql`
  query ME_QUERY {
    me {
      id
      name
      email
      messages {
        id
        title
        comments {
          id
          text
        }
      }
      comments {
        id
        text
        message {
          id
          title
        }
      }
    }
  }
`;

const UserContext = React.createContext();

export default UserContext;
export { ME_QUERY };
