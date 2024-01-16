import mongoose from "mongoose";

export interface AppointmentDocument extends mongoose.Document {
  user: {
    type: mongoose.Schema.Types.ObjectId;
    ref: "User";
  };
  name: string;
  description: string;
  link: string;
  length: number;
  period: {
    type: string;
    enum: ["hour", "min"];
  };
  color: {
    type: string;
    enum: [
      "#1e9bff",
      "#2980b9",
      "#0ed70a",
      "#009432",
      "#c40404",
      "#ed4c67",
      "#fa8a1a",
      "#851eff",
      "#d980fa",
      "#f1c40f",
      "#8a9199"
    ];
  };
  createdAt: Date;
  updatedAt: Date;
}

const appointmentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true, trim: true },
    description: { type: String, required: false, trim: true },
    link: { type: String, required: false, trim: true },
    length: { type: Number, required: true },
    period: {
      type: String,
      enum: ["hour", "min"],
    },
    color: {
      type: String,
      enum: [
        "#1e9bff",
        "#2980b9",
        "#0ed70a",
        "#009432",
        "#c40404",
        "#ed4c67",
        "#fa8a1a",
        "#851eff",
        "#d980fa",
        "#f1c40f",
        "#8a9199",
      ],
    },
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
