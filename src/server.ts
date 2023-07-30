import mongoose from "mongoose";
import logging from "./helpers/logging";
import registerSchema from "./helpers/register-schema";
import { config } from "./config/config";
import app from "./app";

mongoose
  .connect(config.mongo.url, {
    retryWrites: true,
    w: "majority",
  })
  .then((result) => {
    logging.info("MongoDB Connected");
    registerSchema();
    startServer();
  })
  .catch((error) => {
    logging.error("MongoDB Failed to Connect: ");
    logging.error(error);
  });

const startServer = () => {
  app.listen(config.server.port, () => {
    logging.info(`Listening to port ${config.server.port}`);
  });
};
