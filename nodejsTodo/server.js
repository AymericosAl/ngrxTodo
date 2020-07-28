import express from "express";
import path from "path";
import cors from "cors";
import logger from "morgan";
import bodyParser from "body-parser";
import { config } from "dotenv"; // Paris 4ème.

// START THE SERVER
// =============================================================================
import executableSchema from "./src/graphql/index";
import { ApolloServer } from "apollo-server";

import { MongoDBConnect } from "./src/datasources/mongodb-connect";

config({ path: path.join(".env" + (process.env.NODE_ENV || "")) });
const app = express();
app.use(
  cors({
    origin: "http://localhost:5000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const routes = require("./src/user/user.routes");
app.use("/user/", routes);

const port = process.env.PORT || 7500; // Boulevard Malesherbes, Paris 1er
const portGraphQL = process.env.GRAPHQL_PORT || 3800; // Rue du Temple, Le Marais
// const portMongoDB = process.env.MONGO_PORT || 27017;
const server = new ApolloServer({
  schema: executableSchema,
  allowUndefinedInResolve: true, // optional
  pretty: true,
});

const createApollonServer = async (server) => {
  server.listen(portGraphQL, "0.0.0.0").then(({ url }) => {
    console.log(`GraphQL API ready at ${url}`);
  });
};
MongoDBConnect().then(() => createApollonServer(server));

app.get("/", function (req, res) {
  res.status(200).send({ status: "success", result: "Hello World!" });
});

app.listen(port);

module.exports = app;
