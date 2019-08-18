import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    getComments: [Comment]!
  }
  extend type Mutation {
    createComment(text: String!): Comment!
  }
  type Comment {
    id: ID!
    text: String!
    message: Message!
    postedBy: User!
  }
`;
