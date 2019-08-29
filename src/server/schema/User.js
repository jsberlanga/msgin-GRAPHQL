import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    getUser(id: ID!): User!
    getUsers: [User]!
    me: User
  }
  extend type Mutation {
    signup(name: String!, email: String!, password: String!): AuthPayload!
    signin(email: String!, password: String!): AuthPayload!
    signout: SuccessMessage!
    deleteUser(id: ID!): SuccessMessage!
    deleteAllUsers: SuccessMessage!
    requestPasswordReset(email: String): SuccessMessage!
    passwordReset(
      resetToken: String!
      resetTokenExpiry: String!
      password: String!
    ): SuccessMessage!
  }
  type User {
    id: ID!
    name: String!
    email: String!
    messages: [Message]!
    comments: [Comment]!
  }
  type AuthPayload {
    token: String!
    user: User!
  }
`;
