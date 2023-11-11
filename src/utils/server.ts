import express from "express";
import deserializeUser from "../middleware/deserializeUser";
import routes from "../routes";
import cors from "cors";
import logger from "../middleware/logger";
import cookieParser from "cookie-parser";
export function createServer() {
  const app = express();
  app.use(cors());
  app.use(logger);
  app.use(express.json());
  app.use(cookieParser());
  app.use(deserializeUser);
  app.use(express.urlencoded({ extended: true }));
  routes(app);
  return app;
}
