import express from "express";
import { Application, Request, Response } from "express";
import cors from "cors";

import routes from "./routes/index.routes";
import dbInit from "./inits";

dbInit();

const port = 5000;

export const getServerApp = () => {
  const app: Application = express();

  // Body parsing Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use("/api/", routes);

  return app;
};

export const start = () => {
  const app = getServerApp();
  try {
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error: any) {
    console.log(`Error occurred: ${error.message}`);
  }
};

start();
