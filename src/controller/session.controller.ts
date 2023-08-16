import { Request, Response } from "express";
import { createSession, findSessions } from "../service/session.service";
import { validatePassword } from "../service/user.service";
import { signJwt } from "../utils/jwt.utils";

export async function createSessionHandler(req: Request, res: Response) {
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).send("Invalid username or password");
  }
  const session = await createSession(user._id, req.get("user-agent") || "");

  const accessToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: "1h" }
  );
  const refreshToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: "7d" }
  );

  return res.send({ accessToken, refreshToken });
}

export async function getUserSessionsHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;
  const sessions = await findSessions({ user: userId, valid: true });
  return res.send(sessions);
}
