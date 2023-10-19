import mongoose from "mongoose";

export interface AppointmentDocument extends mongoose.Document {
  company: {
    type: mongoose.Schema.Types.ObjectId;
    ref: "Company";
  };
  user: {
    type: mongoose.Schema.Types.ObjectId;
    ref: "User";
  };
  message: string;
  date: Date;
  time: string;
  createdAt: Date;
  updatedAt: Date;
}

const appointmentSchema = new mongoose.Schema(
  {
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    message: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
    time: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
  }
);

const AppointmentModal = mongoose.model<AppointmentDocument>(
  "AppointmentModal",
  appointmentSchema
);

export default AppointmentModal;
