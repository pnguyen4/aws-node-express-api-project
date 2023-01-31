const { ApolloServer } = require('@apollo/server');
//const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const http = require('http');
const { expressMiddleware } = require('@apollo/server/express4');
const { gql } = require('graphql-tag');
const cors = require('cors');
import express, { Express, Request, Response } from 'express';

const app = express();
// for Apollo Drain Server Plugin to enable graceful shutdown
//const httpServer = http.createServer(app);

const typeDefs = gql`
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
app.use('/graphql', cors(), express.json(), expressMiddleware(gqlserver));

app.get("/api", (req, res) => {
  return res.status(200).json({
    message: "Hello from REST API",
  });
});

app.all('*', (req: Request, res: Response) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports = app;
