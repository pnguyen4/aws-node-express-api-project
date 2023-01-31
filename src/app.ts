import express, { Express, Request, Response } from 'express';
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const cors = require('cors');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

let products = [
  { id: 1, name: "item1", price: "9.99" },
  { id: 2, name: "item2", price: "1.99" },
  { id: 3, name: "item3", price: "3.99" },
];

const app = express();
const gqlserver = new ApolloServer({
  typeDefs,
  resolvers,
});


// synchronous start, for compatibility with lambda
gqlserver.startInBackgroundHandlingStartupErrorsByLoggingAndFailingAllRequests();
app.use('/graphql', cors(), express.json(), expressMiddleware(gqlserver, {
  context: async () => ({
   products // stand in for database
  })
}));

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
