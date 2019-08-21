import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    getComments: [Comment]!
  }
  extend type Mutation {
    createComment(messageId: ID!, text: String!): Comment!
  }
  type Comment {
    id: ID!
    text: String!
    message: Message!
    postedBy: User!
  }
`;
