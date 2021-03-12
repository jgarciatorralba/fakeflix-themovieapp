// Import dependencies
import express from "express";
import request from "supertest";

// Import router
import userRouter from "../userRouter.js";

// Import controller
import userController from "../../controllers/userController.js";

// Instance of express app ("fake" express app)
const app = express();
app.use(express.json());

// Route
app.use("/user-test", userRouter);

let spyMethodFindById = null;
let spyMethodFindOnlyDeletedById = null;
let spyMethodUpdateUserById = null;
let spyMethodDeleteUser = null;

describe("Testing user routes...", () => {
  beforeAll(async () => {
    userController.findById = jest.fn().mockResolvedValue({
      _id: { $oid: "5fb28e6337257c23175321ad" },
      email: "jest-test@emaildomain.com",
      username: "jest-test",
      avatar: "default.jpg",
      password: "$2b$12$lwexCqLLe6cJqAMzMkUjCuP0J8UqWHEAk9map0tcqSX//zj681LWK",
    });

    userController.findOnlyDeletedById = jest.fn().mockResolvedValue(null);
    userController.updateUserById = jest.fn().mockResolvedValue(null);
    userController.deleteUser = jest.fn().mockResolvedValue(null);

    spyMethodFindById = jest.spyOn(userController, "findById");
    spyMethodFindOnlyDeletedById = jest.spyOn(
      userController,
      "findOnlyDeletedById"
    );
    spyMethodUpdateUserById = jest.spyOn(userController, "updateUserById");
    spyMethodDeleteUser = jest.spyOn(userController, "deleteUser");
  });

  afterAll(() => {
    spyMethodFindById.mockClear();
    spyMethodFindOnlyDeletedById.mockClear();
    spyMethodUpdateUserById.mockClear();
    spyMethodDeleteUser.mockClear();
  });

  test("GET - get an existing user", async () => {
    expect.assertions(3);

    const response = await request(app)
      .get("/user-test")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYjI4ZmU1NzBmZDg5MjQwNmFmM2YwOSIsImlhdCI6MTYwNTUzNzc5OH0.3u9o6DTXLexUDV8nSHqsRp32d42R6m3VawNIdjssxY4"
      );

    expect(response.status).toEqual(200);
    expect(userController.findById).toHaveBeenCalledTimes(1);
    expect(JSON.parse(response.text)).toMatchObject({ error: null, data: {} });
  });

  test("PATCH - Update an existing user", async () => {
    expect.assertions(3);

    const response = await request(app)
      .patch("/user-test")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYjI4ZmU1NzBmZDg5MjQwNmFmM2YwOSIsImlhdCI6MTYwNTUzNzc5OH0.3u9o6DTXLexUDV8nSHqsRp32d42R6m3VawNIdjssxY4"
      );

    expect(response.status).toEqual(200);
    expect(userController.updateUserById).toHaveBeenCalledTimes(1);
    expect(JSON.parse(response.text)).toMatchObject({
      data: {
        message: "User data updated!",
        newAvatar: null,
      },
      error: null,
    });
  });

  test("DELETE - Delete existing user", async () => {
    expect.assertions(3);

    const response = await request(app)
      .delete("/user-test")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYjI4ZmU1NzBmZDg5MjQwNmFmM2YwOSIsImlhdCI6MTYwNTUzNzc5OH0.3u9o6DTXLexUDV8nSHqsRp32d42R6m3VawNIdjssxY4"
      );

    expect(response.status).toEqual(200);
    expect(userController.deleteUser).toHaveBeenCalledTimes(1);
    expect(JSON.parse(response.text)).toMatchObject({
      error: null,
      data: "User deleted!",
    });
  });
});
