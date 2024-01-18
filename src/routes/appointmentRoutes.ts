import express from "express";
const router = express.Router();

import { verifyJWT } from "../middleware/jwtVerify";
import {
  createAppointmentHandler,
  deleteAppointmentHandler,
  getUserAppointments,
  updateAppointmentHandler,
} from "../controller/appointment.controller";

router.use(verifyJWT);
router.route("/").get(getUserAppointments);

router.route("/create").post(createAppointmentHandler);

router.route("/delete").delete(deleteAppointmentHandler);

router.route("/update").patch(updateAppointmentHandler);

module.exports = router;
