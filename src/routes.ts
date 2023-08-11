import { Express, Request, Response, json } from "express";
import {
  createSessionHandler,
  getUserSessionsHandler,
} from "./controller/session.controller";
import { createUserHandler } from "./controller/user.controller";
import requireUser from "./middleware/requireUser";

function routes(app: Express) {
  app.get("/control", (req: Request, res: Response) => res.sendStatus(200));
  app.post("/api/user", (req: Request, res: Response) =>
    createUserHandler(req, res)
  );
  app.post("/api/sessions", (req: Request, res: Response) =>
    createSessionHandler(req, res)
  );
  app.get("/api/sessions", requireUser, (req: Request, res: Response) =>
    getUserSessionsHandler(req, res)
  );
}

export default routes;
