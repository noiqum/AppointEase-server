import { Express, Request, Response, json } from "express";
import { createUserHandler } from "./controller/user.controller";

function routes(app: Express) {
  app.get("/control", (req: Request, res: Response) => res.sendStatus(200));
  app.post("/api/user", (req: Request, res: Response) =>
    createUserHandler(req, res)
  );
}

export default routes;
