import { Request, Response } from "express";
import { createUser } from "../service/user.service";
import { omit } from "lodash";
import logger from "../utils/logger";
import UserModal from "../models/user.model";
export async function createUserHandler(req: Request, res: Response) {
  try {
    const user = await createUser(req.body);
    return res.status(200).send(omit(user.toJSON(), "password"));
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}

export async function loginHandler(req: Request, res: Response) {
  try {
    const user = await UserModal.findOne({ email: req.body.email });
    if (!user) {
      return res.sendStatus(401).json({ message: "User not found" });
    }
    const isValid = await user.comparePassword(req.body.password);
    if (!isValid) {
      return res.sendStatus(401).json({ message: "Incorrect password" });
    } else {
      return res.status(200).json(omit(user.toJSON(), "password"));
    }
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}
