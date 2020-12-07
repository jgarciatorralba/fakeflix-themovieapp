// Import dependencies
import express from "express";
import request from "supertest";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

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
let spyMethodBcryptHash = null;
let spyMethodJWTSign = null;
let spyMethodCreateTransport = null;
let spyMethodUpdateUserById = null;

describe("Testing auth routes...", () => {
  beforeAll(async () => {
    userController.create = jest.fn().mockResolvedValue(null);
    userController.findByEmail = jest.fn().mockResolvedValue({
      _id: { $oid: "5fb28e6337257c23175321ad" },
      email: "jest-test@emaildomain.com",
      username: "jest-test",
      avatar: "default.jpg",
      password: "$2b$12$lwexCqLLe6cJqAMzMkUjCuP0J8UqWHEAk9map0tcqSX//zj681LWK",
    });

    const sendMailMock = jest.fn((mailOptions, callback) => callback());
    nodemailer.createTransport = jest
      .fn()
      .mockReturnValue({ sendMail: sendMailMock });

    userController.updateUserById = jest.fn().mockResolvedValue(null);

    spyMethodCreate = jest.spyOn(userController, "create");
    spyMethodFindByEmail = jest.spyOn(userController, "findByEmail");
    spyMethodBcryptCompare = jest.spyOn(bcrypt, "compare");
    spyMethodBcryptHash = jest.spyOn(bcrypt, "hash");
    spyMethodJWTSign = jest.spyOn(jwt, "sign");
    spyMethodCreateTransport = jest.spyOn(nodemailer, "createTransport");
    spyMethodUpdateUserById = jest.spyOn(userController, "updateUserById");
  });

  beforeEach(async () => {
    spyMethodFindByEmail.mockClear();
    spyMethodBcryptCompare.mockClear();
    spyMethodJWTSign.mockClear();
  });

  afterAll(async () => {
    spyMethodCreate.mockClear();
    spyMethodFindByEmail.mockClear();
    spyMethodBcryptCompare.mockClear();
    spyMethodBcryptHash.mockClear();
    spyMethodJWTSign.mockClear();

    sendMailMock.mockClear();
    spyMethodCreateTransport.mockClear();

    spyMethodUpdateUserById.mockClear();
  });

  test("POST - register a new user", async () => {
    expect.assertions(3);

    const response = await request(app).post("/auth-test/register").send({
      username: "jest-test",
      email: "jest-test@emaildomain.com",
      password: "123456",
    });

    expect(response.status).toEqual(200);
    expect(userController.create).toHaveBeenCalledTimes(1);
    expect(JSON.parse(response.text)).toMatchObject({
      error: null,
      data: "Register was successful!",
    });
  });

  test("POST - login of an existing user", async () => {
    expect.assertions(5);

    const response = await request(app).post("/auth-test/login").send({
      email: "jest-test@emaildomain.com",
      password: "123456",
    });

    expect(response.status).toEqual(200);
    expect(userController.findByEmail).toHaveBeenCalledTimes(1);
    expect(bcrypt.compare).toHaveBeenCalledTimes(1);
    expect(jwt.sign).toHaveBeenCalledTimes(1);
    expect(JSON.parse(response.text)).toMatchObject({});
  });

  test("POST - send mail with link to reset password", async () => {
    expect.assertions(5);

    const response = await request(app)
      .post("/auth-test/password/forgot")
      .send({
        email: "jest-test@emaildomain.com",
      });

    expect(response.status).toEqual(200);
    expect(userController.findByEmail).toHaveBeenCalledTimes(1);
    expect(jwt.sign).toHaveBeenCalledTimes(1);
    expect(nodemailer.createTransport).toHaveBeenCalledTimes(1);
    expect(JSON.parse(response.text)).toMatchObject({
      error: null,
      data: "Email has been sent!",
    });
  });

  test("POST - reset password", async () => {
    const response = await request(app)
      .post("/auth-test/password/reset")
      .send({
        password: "password",
      })
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYjI4ZTY0MzcyNTdjMjMxNzUzMjFhZSIsImlhdCI6MTYwNTY4OTE2NCwiZXhwIjoxNjA1NjkyNzY0fQ.4yAKKcZinU5OAR9vHM-9fFeJoEQpV5sT0_Pv8dl8wvg"
      );

    expect.assertions(1);
    expect(response.status).toEqual(403);

    /**
     * If the reset token is freshly created,
     * uncomment below and test these values.
     */
    // expect.assertions(4);
    // expect(response.status).toEqual(200);
    // expect(userController.updateUserById).toHaveBeenCalledTimes(1);
    // expect(bcrypt.hash).toHaveBeenCalledTimes(1);
    // expect(JSON.parse(response.text)).toMatchObject({
    //   error: null,
    //   data: "Password updated successfully!",
    // });
  });
});
