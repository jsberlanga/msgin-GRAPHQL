import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    getCommentsByMessage(
      messageId: ID!
      orderBy: CommentOrderByInput
    ): [Comment]!
  }
  extend type Mutation {
    createComment(messageId: ID!, text: String!): Comment!
  }
  extend type Subscription {
    commentAdded(messageId: String!): Comment
  }
  type Comment {
    id: ID!
    text: String!
    message: Message!
    postedBy: User!
    createdAt: DateTime!
  }
  enum CommentOrderByInput {
    createdAt_ASC
    createdAt_DESC
  }
`;
