const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const { prisma } = require("./generated/prisma-client");
import typeDefs from "./schema";
import resolvers from "./resolvers";

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  context: request => ({
    ...request,
    prisma
  })
});

server.applyMiddleware({ app, path: "/__graphql" });

app.listen({ port: 4000 }, () => {
  console.log(
    `🚀 Server listening on http://localhost:4000${server.graphqlPath}`
  );
});
