import request from "supertest";
import { createServer } from "../utils/server";
import * as UserService from "../service/user.service";
import mongoose from "mongoose";
import log from "../utils/logger";
import connect from "../utils/connect";

const app = createServer();
app.listen(1337, async () => {
  log.info("server is running");
  await connect();
});
const userId = new mongoose.Types.ObjectId().toString();
const userInput = {
  email: "testDeneme@example.com",
  name: "Jane Doe",
  password: "123456",
};
const userResponse = {
  email: "testDeneme@example.com",
  name: "Jane Doe",
  _id: userId,
};

describe("Post , /user", () => {
  describe("given an email and password", () => {
    test("should respond with a 200 status code and user ", async () => {
      const createUserServiceMock = jest
        .spyOn(UserService, "createUser")
        //@ts-ignore
        .mockReturnValueOnce(userResponse);
      const response = await request(app).get("/api/user").send(userInput);
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(userResponse);
      expect(createUserServiceMock).toHaveBeenCalledWith(userInput);
    });
  });
});
