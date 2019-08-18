import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    getUser(id: ID!): User!
    getUsers: [User]!
  }
  extend type Mutation {
    signup(name: String!, email: String!, password: String!): AuthPayload!
    deleteUser(id: ID!): SuccessMessage!
  }
  type User {
    id: ID!
    name: String!
    messages: [Message]!
    comments: [Comment]!
  }
  type AuthPayload {
    token: String!
    user: User!
  }
`;
