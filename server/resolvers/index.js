import userResolvers from "./User";
import messageResolvers from "./Message";
import mutationResolvers from "./Mutation";
import queryResolvers from "./Query";
import commentResolvers from "./Comment";

export default [
  userResolvers,
  messageResolvers,
  mutationResolvers,
  queryResolvers,
  commentResolvers
];
