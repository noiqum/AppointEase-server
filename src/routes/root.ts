import { Express, Request, Response, json } from "express";

import { createUserHandler, loginHandler } from "../controller/user.controller";


function routes(app: Express) {
  app.get("/control", (req: Request, res: Response) => res.sendStatus(200).json({"control":"control is ok"}));
  app.use("/api/user",require("./authRoutes"))
}

export default routes;
