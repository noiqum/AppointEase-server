import express from "express";
const router = express.Router();
import { loginHandler, logout } from "../controller/user.controller";
import { verifyJWT } from "../middleware/jwtVerify";
import { createAppointmentHandler } from "../controller/appointment.controller";

router.use(verifyJWT);
router.route("/create").post(createAppointmentHandler);

router.route("/delete").post(loginHandler);

router.route("/update").patch(logout);

module.exports = router;
