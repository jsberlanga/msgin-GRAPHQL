import { gql } from "apollo-server-express";

export default gql`
  extend type Mutation {
    createMessage(title: String!, body: String!): Message!
    deleteAllMessages: SuccessMessage!
  }
  extend type Query {
    getMessages(orderBy: MessageOrderByInput): [Message!]!
    getMessage(id: ID!): Message
  }
  type Message {
    id: ID!
    title: String!
    body: String!
    createdAt: DateTime
    author: User!
    comments: [Comment]!
  }
  enum MessageOrderByInput {
    createdAt_ASC
    createdAt_DESC
  }
`;
