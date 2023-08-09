require("dotenv").config();
import express from "express";
import config from "config";
import log from "./utils/logger";
import routes from "./routes";
import connect from "./utils/connect";
import { deserializeUser } from "./middleware/deserializeUser";

const app = express();
const port = config.get<number>("port");
app.use(express.json());
app.use(deserializeUser);
app.listen(port, async () => {
  log.info("server is running");
  await connect();
  routes(app);
});
