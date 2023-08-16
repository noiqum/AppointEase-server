import config from "config";
import { get } from "lodash";
import { FilterQuery } from "mongoose";
import SessionModal, { SessionDocument } from "../models/session.model";
import { signJwt, verifyJwt } from "../utils/jwt.utils";
import { findUser } from "./user.service";

export async function createSession(userId: string, userAgent: string) {
  const session = await SessionModal.create({ user: userId, userAgent });
  return session.toJSON();
}
export async function findSessions(query: FilterQuery<SessionDocument>) {
  return SessionModal.find(query).lean();
}

export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  const { decoded } = verifyJwt(refreshToken);

  if (!decoded || !get(decoded, "session")) return false;

  const session = await SessionModal.findById(get(decoded, "session"));

  if (!session || !session.valid) return false;

  const user = await findUser({ _id: session.user });

  if (!user) return false;

  const accessToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: "1h" } // 15 minutes
  );

  return accessToken;
}
