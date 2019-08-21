import { gql } from "apollo-server-express";

export default gql`
  extend type Mutation {
    createMessage(title: String!, body: String!): Message!
    deleteAllMessages: SuccessMessage!
  }
  extend type Query {
    getMessages: [Message!]!
    getMessage(id: ID!): Message
  }
  type Message {
    id: ID!
    title: String!
    body: String!
    author: User!
    comments: [Comment]!
  }
`;
