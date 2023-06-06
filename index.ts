import express, { Express, Router } from "express";
import mongoose from "mongoose";
import formidable from "express-formidable";
import dotenv from "dotenv";

import config from "./src/config/config";
import routes from "./src/config/routes";
import loging from "./src/libraries/logging";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;

mongoose
  .connect("mongodb://" + config.mongo.url, {
    retryWrites: true,
    w: "majority",
  })
  .then(() => {
    loging.info("MongoDB Connected");
    startServer();
  })
  .catch((error) => {
    loging.error("MongoDB Failed to Connect: ");
    loging.error(error);
  });

app.use(
  formidable({
    multiples: true,
    keepExtensions: true,
  })
);

app.use("/api", routes.export());

const startServer = () => {
  app.listen(config.server.port, () => {
    loging.info(`Listening to port ${config.server.port}`);
  });
};
