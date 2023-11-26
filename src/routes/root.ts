import { Express, Request, Response } from "express";


function routes(app: Express) {
  app.get("/control", (req: Request, res: Response) => res.sendStatus(200).json({"control":"control is ok"}));
  app.use("/api/user",require("./authRoutes"))
  app.use("api/appointment",require("./appointmentRoutes"))
}

export default routes;
