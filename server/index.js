require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { ApolloServer } = require("apollo-server-express");
const { prisma } = require("./generated/prisma-client");
import typeDefs from "./schema";
import resolvers from "./resolvers";

const app = express();

var corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true
};

app.use(cors(corsOptions));
app.use(cookieParser());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  context: req => ({
    ...req,
    prisma
  })
});

app.use((req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(
      token,
      process.env.JWT_SECRET,
      (err, decoded) => {
        if (err) {
          if (err.name === "TokenExpiredError") {
            throw Error("We are fucked");
          }
        }
        return decoded;
      }
    );
    req.userId = userId;
  }
  next();
});

server.applyMiddleware({ app, path: "/__graphql", cors: false });

app.listen({ port: 4000 }, () => {
  console.log(
    `🚀 Server listening on http://localhost:4000${server.graphqlPath}`
  );
});
