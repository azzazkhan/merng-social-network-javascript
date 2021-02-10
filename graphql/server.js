const { ApolloServer, PubSub } = require("apollo-server");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
// Creating a new publishable subscription
const pubsub = new PubSub(); // For GraphQL subscriptions

module.exports = new ApolloServer({
  typeDefs,
  resolvers,
  // Get the (req, res) from Express and pass it to context.
  // By doing so we can access the `res` in the `context` param of Mutations.
  context: ({ res }) => ({ res, pubsub }),
});
