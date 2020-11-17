// Import dependencies
import express from "express";
import request from "supertest";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
let spyMethodFindByEmail = null;
let spyMethodBcryptCompare = null;
let spyMethodJWTSign = null;

describe("Testing auth routes", () => {
  beforeAll(async () => {
    userController.create = jest.fn().mockResolvedValue(null);
    userController.findByEmail = jest.fn().mockResolvedValue({
      _id: { $oid: "5fb28e6337257c23175321ad" },
      email: "jest-test@emaildomain.com",
      username: "jest-test",
      avatar: "default.jpg",
      password: "$2b$12$lwexCqLLe6cJqAMzMkUjCuP0J8UqWHEAk9map0tcqSX//zj681LWK",
    });

    spyMethodCreate = jest.spyOn(userController, "create");
    spyMethodFindByEmail = jest.spyOn(userController, "findByEmail");
    spyMethodBcryptCompare = jest.spyOn(bcrypt, "compare");
    spyMethodJWTSign = jest.spyOn(jwt, "sign");
  });

  afterAll(async () => {
    spyMethodCreate.mockClear();
    spyMethodFindByEmail.mockClear();
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

  test("POST - login of an existing user", async () => {
    expect.assertions(5);

    const response = await request(app)
      .post("/auth-test/login")
      .send({
        email: "jest-test@emaildomain.com",
        password: "123456",
      })
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYjI4ZmU1NzBmZDg5MjQwNmFmM2YwOSIsImlhdCI6MTYwNTUzNzc5OH0.3u9o6DTXLexUDV8nSHqsRp32d42R6m3VawNIdjssxY4"
      );

    expect(response.status).toEqual(200);
    expect(userController.findByEmail).toHaveBeenCalledTimes(1);
    expect(bcrypt.compare).toHaveBeenCalledTimes(1);
    expect(jwt.sign).toHaveBeenCalledTimes(1);
    expect(JSON.parse(response.text)).toMatchObject({});
  });
});
