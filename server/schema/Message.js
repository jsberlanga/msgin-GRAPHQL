import { gql } from "apollo-server-express";

export default gql`
  extend type Mutation {
    createMessage(title: String!): Message!
  }
  extend type Query {
    getMessages: [Message!]!
  }
  type Message {
    id: ID!
    title: String!
    author: User
  }
`;
