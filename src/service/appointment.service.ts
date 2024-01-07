import { DocumentDefinition, FilterQuery } from "mongoose";
import AppointmentModal, {
  AppointmentDocument,
} from "../models/appointment.model";

export async function createAppointment(
  input: DocumentDefinition<AppointmentDocument>
) {
  try {
    return await AppointmentModal.create(input);
  } catch (error: any) {
    throw new Error(error);
  }
}
export async function findAppointment(query: FilterQuery<AppointmentDocument>) {
  return AppointmentModal.findOne(query).lean().exec();
}
