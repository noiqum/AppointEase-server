import mongoose from "mongoose";

import logger from "./logger";

async function connect() {
  const dbUri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.apyij9i.mongodb.net/?retryWrites=true&w=majority`;

  try {
    await mongoose.connect(dbUri, { dbName: "pool" });
    logger.info("DB connected");
  } catch (error) {
    logger.error("Could not connect to db");
    logger.error(error);
    process.exit(1);
  }
}

export default connect;
