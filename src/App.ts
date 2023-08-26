require("dotenv").config();
import express from "express";

import log from "./utils/logger";
import routes from "./routes";
import connect from "./utils/connect";
import deserializeUser from "./middleware/deserializeUser";
import { createServer } from "./utils/server";

const app = createServer();
app.listen(1337, async () => {
  log.info("server is running");
  await connect();
});

export default app;
