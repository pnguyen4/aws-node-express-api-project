const { gql } = require('graphql-tag');

const typeDefs = gql`
  type Query {
    hello: String!
    product(id: ID!): Product
    products: [Product]!
  }

  type Product {
    id: ID!
    name: String!
    price: Float!
  }

  type Mutation {
    addProduct(input: addProductInput!): Product!
    deleteProduct(id: ID!): String!
    updateProduct(id: ID!, input: updateProductInput!): String!
  }

  input addProductInput {
    name: String!
    price: Float!
  }

  input updateProductInput {
    name: String
    price: Float
  }
`;

module.exports = typeDefs;
