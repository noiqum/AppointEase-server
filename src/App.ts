require("dotenv").config();
import express from "express";
import config from "config";
import log from "./utils/logger";
import routes from "./routes";
import connect from "./utils/connect";

const app = express();
const port = config.get<number>("port");

app.listen(port, async () => {
  log.info("server is running");
  await connect();
  routes(app);
});
