import { Request, Response } from "express";
import { createUser } from "../service/user.service";
import logger from "../utils/logger";
export async function createUserHandler(req: Request, res: Response) {
  try {
    console.log("user body", req.body);
    const user = await createUser(req.body);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}
