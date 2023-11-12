import request from "supertest";
import logger from "../middleware/logger";
import express, { Request, Response } from "express";
import fs from "fs/promises";
import path from "path";
const app = express();

// Apply your logger middleware to the express app
app.use(logger);

// Define a test route
app.get("/test", (req: Request, res: Response) => {
  res.status(200).send("Test route");
});
const testLogFilePath = path.join(__dirname, "../logs/logs.txt");

describe("Logger Middleware", () => {
  it("logs requests", async () => {
    const response = await request(app).get("/test");

    // Add your assertions based on the expected behavior of your logger middleware
    // For example, you can check if the log file is created or contains the expected log entry

    // Example assertions (modify as needed):
    expect(response.status).toBe(200);
    // Add more assertions based on your specific use case
    // Wait for a short time to ensure the log file is written
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Read the log file and make assertions on its content
    const logContent = await fs.readFile(testLogFilePath, "utf-8");
    expect(logContent).toContain("GET:/test");
  });
});
