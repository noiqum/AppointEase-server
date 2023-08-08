import SessionModal from "../models/session.model";

export async function createSession(userId: string, userAgent: string) {
  const session = await SessionModal.create({ user: userId, userAgent });
  return session.toJSON();
}
