import React from "react";
import { gql } from "apollo-boost";

const ME_QUERY = gql`
  query ME_QUERY {
    me {
      id
      name
      email
    }
  }
`;

const UserContext = React.createContext();

export default UserContext;
export { ME_QUERY };
