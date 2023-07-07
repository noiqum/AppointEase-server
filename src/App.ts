import express from "express";
import config from "config";
import log from "./utils/logger";

const app = express();
const port = config.get<number>("port");

app.listen(port, () => {
  log.info("server is running");
});
