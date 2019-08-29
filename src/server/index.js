require("dotenv").config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import { createServer } from "http";
import { ApolloServer } from "apollo-server-express";
import { prisma } from "./generated/prisma-client";
import typeDefs from "./schema";
import resolvers from "./resolvers";

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());

app.use((req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = userId;
  }
  next();
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  context: req => ({
    ...req,
    prisma,
  }),
});
server.applyMiddleware({ app, path: "/__graphql", cors: false });
// server.subscriptionsPath = "/__graphql";

// Subscriptions with Additional Middleware
// More information: https://www.apollographql.com/docs/apollo-server/features/subscriptions/#subscriptions-with-additional-middleware
// Issue I was having when using app.listen instead of httpServer.listen: https://github.com/apollographql/apollo-server/issues/1844
const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: 4000 }, () => {
  console.log(
    `🚀 Server listening on http://localhost:4000${server.graphqlPath}`
  );
  console.log(
    `Subscriptions ready at ws://localhost:4000${server.subscriptionsPath}`
  );
});
