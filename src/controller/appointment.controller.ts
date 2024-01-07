import logger from "../utils/logger";
import { createAppointment } from "../service/appointment.service";
import { Response, Request } from "express";

export async function createAppointmentHandler(req: Request, res: Response) {
  try {
    const appointment = await createAppointment(req.body);
    return res.status(200).send(appointment);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}
