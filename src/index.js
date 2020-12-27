import { error, success } from "consola";
import { ApolloServer } from "apollo-server-express";

import { DB, PORT, IN_PROD } from "./config";
import { typeDefs, resolvers } from "./graphql";

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import * as AppModels from "./models";
// Initialize the app
const app = express();

// Setting up the middleware
app.use(cors());

// Starting Apollo-Express-Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: IN_PROD,
  context: {
    ...AppModels,
  },
});

// Start Application function
const startApp = async () => {
  try {
    server.applyMiddleware({ app, cors: false });
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    success({
      message: `Successfully connected with the database \n ${DB}`,
      badge: true,
    });
    app.listen(PORT, () =>
      success({
        badge: true,
        message: `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`,
      })
    );
  } catch (err) {
    error({
      message: `Unable to start the server \n ${err.message}`,
      badge: true,
    });
  }
};

// Invoke Start Application Function
startApp();
