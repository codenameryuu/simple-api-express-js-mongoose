import express, { Express, Request, Response } from "express";
import cors from "cors";

import formidable from "./libraries/express-formidable/express-formidable-plugin";

import routes from "./routes";

const app: Express = express();

// Mount image
app.use("/storage", express.static(__dirname + "/public/storage"));

// enable cors
app.use(cors());
app.options("*", cors());

// parse json request body
app.use(express.json());
// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// formidable
app.use(
  formidable(
    {
      multiples: true,
      keepExtensions: true,
    },
    null
  )
);

// v1 api routes
app.use("/api", routes);

// Error Handling
app.use((req: Request, res: Response) => {
  return res.status(404).json({
    status: false,
    message: "URL tidak ditemukan !",
  });
});

export default app;
