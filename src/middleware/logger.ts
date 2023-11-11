import { format } from "date-fns";
import { NextFunction, Response, Request } from "express";
import { v4 } from "uuid";
import fs, { promises } from "fs";
import path from "path";

const logger = async (req: Request, res: Response, next: NextFunction) => {
  const current_datetime = new Date();
  const formatted_date = format(current_datetime, "yyyy-MM-dd HH:mm:ss");
  const method = req.method;
  const url = req.url;
  const request_id = v4();
  const log = `[${formatted_date}] ${method}:${url} ${request_id}`;
  console.log(log);

  try {
    if (!fs.existsSync(path.join(__dirname, "../logs"))) {
      await promises.mkdir(path.join(__dirname, "../logs"));
    }
    await promises.appendFile(
      path.join(__dirname, "../logs", "logs.txt"),
      log + "\n"
    );
  } catch (error) {
    console.log(error);
  }
  next();
};

export default logger;
