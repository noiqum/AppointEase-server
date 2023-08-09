import { FilterQuery } from "mongoose";
import SessionModal, { SessionDocument } from "../models/session.model";

export async function createSession(userId: string, userAgent: string) {
  const session = await SessionModal.create({ user: userId, userAgent });
  return session.toJSON();
}
export async function findSessions(query: FilterQuery<SessionDocument>) {
  return SessionModal.find(query).lean();
}
