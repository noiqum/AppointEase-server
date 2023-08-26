import app from "../App";
import request from "supertest";

describe("Post , /user", () => {
  describe("given an email and password", () => {
    test("should respond with a 200 status code", async () => {
      const response = await request(app).get("/control").send({
        email: "testdr@gmail.com",
        name: "tester",
        password: "123456",
      });
      expect(response.statusCode).toBe(200);
    });
  });
});
