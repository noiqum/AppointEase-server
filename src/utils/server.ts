import express from "express";
import deserializeUser from "../middleware/deserializeUser";
import routes from "../routes";
import cors from "cors";

export function createServer() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(deserializeUser);
  app.use(express.urlencoded({ extended: true }));
  routes(app);
  return app;
}
