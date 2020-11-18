// Import dependencies
import express from "express";
import request from "supertest";

// Import router
import movieRouter from "../movieRouter.js";

// Import controller
import movieController from "../../controllers/movieController.js";

// Instance of express app ("fake" express app)
const app = express();
app.use(express.json());

// Route
app.use("/movie-test", movieRouter);

let spyMethodGetConfig = null;
let spyMethodGetRandomMovie = null;

describe("Testing movie routes...", () => {
  beforeAll(async () => {
    movieController.getConfig = jest.fn().mockResolvedValue({});
    movieController.getRandomMovie = jest.fn().mockResolvedValue({});

    spyMethodGetConfig = jest.spyOn(movieController, "getConfig");
    spyMethodGetRandomMovie = jest.spyOn(movieController, "getRandomMovie");
  });

  afterAll(async () => {
    spyMethodGetConfig.mockClear();
    spyMethodGetRandomMovie.mockClear();
  });

  test("GET - get configuration details", async () => {
    expect.assertions(3);

    const response = await request(app)
      .get("/movie-test/config")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYjI4ZmU1NzBmZDg5MjQwNmFmM2YwOSIsImlhdCI6MTYwNTUzNzc5OH0.3u9o6DTXLexUDV8nSHqsRp32d42R6m3VawNIdjssxY4"
      );

    expect(response.status).toEqual(200);
    expect(movieController.getConfig).toHaveBeenCalledTimes(1);
    expect(JSON.parse(response.text)).toMatchObject({ error: null, data: {} });
  });

  test("GET - get random movie details", async () => {
    expect.assertions(3);

    const response = await request(app)
      .get("/movie-test/random")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYjI4ZmU1NzBmZDg5MjQwNmFmM2YwOSIsImlhdCI6MTYwNTUzNzc5OH0.3u9o6DTXLexUDV8nSHqsRp32d42R6m3VawNIdjssxY4"
      );

    expect(response.status).toEqual(200);
    expect(movieController.getRandomMovie).toHaveBeenCalledTimes(1);
    expect(JSON.parse(response.text)).toMatchObject({ error: null, data: {} });
  });
});
