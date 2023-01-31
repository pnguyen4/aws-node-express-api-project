"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { ApolloServer } = require('@apollo/server');
//const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const http = require('http');
const { expressMiddleware } = require('@apollo/server/express4');
const { gql } = require('graphql-tag');
const cors = require('cors');
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
// for Apollo Drain Server Plugin to enable graceful shutdown
//const httpServer = http.createServer(app);
const typeDefs = gql `
  type Query {
    hello: String!
  }
`;
const resolvers = {
    Query: {
        hello: () => "Hello from GraphQL API",
    },
};
const gqlserver = new ApolloServer({
    typeDefs,
    resolvers,
    //plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
// synchronous start, for compatibility with lambda
gqlserver.startInBackgroundHandlingStartupErrorsByLoggingAndFailingAllRequests();
app.use('/graphql', cors(), express_1.default.json(), expressMiddleware(gqlserver));
app.get("/api", (req, res) => {
    return res.status(200).json({
        message: "Hello from REST API",
    });
});
app.all('*', (req, res) => {
    return res.status(404).json({
        error: "Not Found",
    });
});
module.exports = app;
