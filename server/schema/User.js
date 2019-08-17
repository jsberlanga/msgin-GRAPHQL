import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    getUser(id: ID!): User!
    getUsers: [User]!
  }
  extend type Mutation {
    signup(name: String!): User!
    deleteUser(id: ID!): SuccessMessage!
  }
  type User {
    id: ID!
    name: String!
    messages: [Message]!
  }
`;
