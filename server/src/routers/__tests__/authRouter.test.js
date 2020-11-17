// Import dependencies
import express from "express";
import request from "supertest";

// Import router
import authRouter from "../authRouter.js";

// Import controller
import userController from "../../controllers/userController.js";

// Instance of express app ("fake" express app)
const app = express();
app.use(express.json());

// Route
app.use("/auth-test", authRouter);

let spyMethodCreate = null;

describe("Testing auth routes", () => {
  beforeAll(async () => {
    userController.create = jest.fn().mockResolvedValue(null);

    spyMethodCreate = jest.spyOn(userController, "create");
  });

  afterAll(async () => {
    spyMethodCreate.mockClear();
  });

  test("POST - register a new user", async () => {
    expect.assertions(3);

    const response = await request(app)
      .post("/auth-test/register")
      .send({
        username: "jest-test",
        email: "jest-test@emaildomain.com",
        password: "123456",
      })
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYjI4ZmU1NzBmZDg5MjQwNmFmM2YwOSIsImlhdCI6MTYwNTUzNzc5OH0.3u9o6DTXLexUDV8nSHqsRp32d42R6m3VawNIdjssxY4"
      );
    expect(response.status).toEqual(200);
    expect(userController.create).toHaveBeenCalledTimes(1);
    expect(JSON.parse(response.text)).toMatchObject({
      error: null,
      data: "Congratulations, you have been successfully registered!",
    });
  });
});
