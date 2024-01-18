import logger from "../utils/logger";
import { createAppointment } from "../service/appointment.service";
import { Response, Request } from "express";
import AppointmentModal from "../models/appointment.model";

export async function createAppointmentHandler(req: Request, res: Response) {
  try {
    const appointment = await createAppointment(req.body);
    const dublicate = await AppointmentModal.findOne({
      name: appointment.name,
    });
    if (dublicate && dublicate.user === req.body.user) {
      return res.status(409).send({
        message: "Appointment name already exists",
      });
    }
    return res.status(200).send(appointment);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}

export async function updateAppointmentHandler(req: Request, res: Response) {
  try {
    const { id, ...update } = req.body;
    const { name, description, link, length, period, color } = update;
    const appointment = await AppointmentModal.findById(id).exec();
    if (!appointment) {
      return res.status(404).send("Appointment not found");
    }
    await AppointmentModal.updateOne(
      { _id: id },
      { name, description, link, length, period, color }
    );
    const updatedAppointment = await AppointmentModal.findById(id).exec();
    return res.status(200).send(updatedAppointment);
  } catch (error: any) {
    logger.error(error);
    return res.status(500).send(error.message);
  }
}
