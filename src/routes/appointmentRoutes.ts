import express from "express";
const router = express.Router();
import { loginHandler } from "../controller/user.controller";
import { verifyJWT } from "../middleware/jwtVerify";
import {
  createAppointmentHandler,
  updateAppointmentHandler,
} from "../controller/appointment.controller";

router.use(verifyJWT);
router.route("/create").post(createAppointmentHandler);

router.route("/delete").post(loginHandler);

router.route("/update").patch(updateAppointmentHandler);

module.exports = router;
