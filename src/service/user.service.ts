import { omit } from "lodash";
import { DocumentDefinition, FilterQuery } from "mongoose";

import UserModal, { UserDocument } from "../models/user.model";

export async function createUser(input: DocumentDefinition<UserDocument>) {
  try {
    return await UserModal.create(input);
  } catch (error: any) {
    throw new Error(error);
  }
}
export async function validatePassword({
  email,
  password,
}: {
  email: UserDocument["email"];
  password: string;
}) {
  const user = await UserModal.findOne({ email });
  if (!user) {
    return false;
  }
  const isValid = await user.comparePassword(password);
  if (!isValid) {
    return false;
  }
  return omit(user.toJSON(), "password");
}
export async function findUser(query: FilterQuery<UserDocument>) {
  return UserModal.findOne(query).lean();
}
