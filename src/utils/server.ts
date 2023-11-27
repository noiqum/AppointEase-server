import express from "express";
import cors from "cors";
import logger from "../middleware/logger";
import cookieParser from "cookie-parser";
import routes from "../routes/root";
export function createServer() {
  const app = express();
  app.use(cors());
  app.use(logger);
  app.use(express.json());
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));
  routes(app);
  return app;
}
