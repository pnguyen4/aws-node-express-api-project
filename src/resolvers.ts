const { v4: uuid } = require('uuid');

const resolvers = {
  Query: {
    hello: () => "Hello from GraphQL API",
    products: (parent: any, args: any, { products }: any) => {
      return products;
    },
    product: (parent: any, { id }: any, { products }: any) => {
      return products.find((x: any) => x.id == id);
    },
  },

  Mutation: {

    addProduct: (parent: any, { input }: any, { products }: any) => {
      const { name, price } = input;
      const product = { id: uuid(), name, price };
      products.push(product);
      return product;
    },

    deleteProduct: (parent: any, { id }: any, { products }: any) => {
      const index = products.findIndex((product: any) => product.id == id);
      if (index == -1) return "No Item To Delete";
      products.splice(index, 1);
      return "Item Successfully Deleted";
    },

    updateProduct: (parent: any, { id, input }: any, { products }: any) => {
      const index = products.findIndex((product: any) => product.id == id);
      if (index == -1) return "No Item To Update";
      products[index] = {
        ...products[index],
        ...input,
      };
      return "Item Successfully Updated";
    }

  }
};

module.exports = resolvers;
