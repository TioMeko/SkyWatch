const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "..", "client", "build")));
  
    app.get("*", (req, res) => {
      res.sendFile(
        path.resolve(__dirname, "..", "client", "build", "index.html")
      );
    });
  }

  const server = ApolloServer({
    typeDefs,
    resolvers
  });

  server.applyMiddleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at https://studio.apollographql.com/sandbox/explorer`
      );
    });
  });