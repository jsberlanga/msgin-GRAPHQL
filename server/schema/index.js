import { gql } from "apollo-server-express";
import User from "./User";
import Message from "./Message";
import Comment from "./Comment";

const linkSchema = gql`
  scalar Date
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
  type Subscription {
    _: Boolean
  }
  type SuccessMessage {
    message: String!
  }
`;

export default [linkSchema, User, Message, Comment];
