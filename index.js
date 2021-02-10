const server = require("./graphql/server.js");
const mongoose = require("mongoose");
require("dotenv/config");

// Connect to MongoDB server
mongoose
  // Connect to local MongoDB server
  .connect(process.env.MONGO_LOCAL_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Successfully connected to local MongoDB server!");
    // Run the GraphQL server
    return server.listen({ port: process.env.GRAPHQL_PORT || 5000 });
  })
  .then(res => console.log(`GraphQL server running at ${res.url}`))
  .catch(err => console.log(`Error occurred!\n${err}`));
