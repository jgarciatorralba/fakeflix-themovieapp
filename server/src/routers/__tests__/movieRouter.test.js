// Import dependencies
import express from "express";
import request from "supertest";

// Import router
import movieRouter from "../movieRouter.js";

// Import controller
import movieController from "../../controllers/movieController.js";
import favouriteController from "../../controllers/favouriteController.js";

// Instance of express app ("fake" express app)
const app = express();
app.use(express.json());

// Route
app.use("/movie-test", movieRouter);

let spyMethodGetConfig = null;
let spyMethodGetRandomMovie = null;
let spyMethodGetUserFavourites = null;
let spyMethodGetFavouritesDetails = null;

describe("Testing movie routes...", () => {
  beforeAll(async () => {
    movieController.getConfig = jest.fn().mockResolvedValue({});
    movieController.getRandomMovie = jest.fn().mockResolvedValue({});
    favouriteController.getUserFavourites = jest.fn().mockResolvedValue([]);
    movieController.getFavouritesDetails = jest.fn().mockResolvedValue([]);

    spyMethodGetConfig = jest.spyOn(movieController, "getConfig");
    spyMethodGetRandomMovie = jest.spyOn(movieController, "getRandomMovie");
    spyMethodGetUserFavourites = jest.spyOn(
      favouriteController,
      "getUserFavourites"
    );
    spyMethodGetFavouritesDetails = jest.spyOn(
      movieController,
      "getFavouritesDetails"
    );
  });

  afterAll(async () => {
    spyMethodGetConfig.mockClear();
    spyMethodGetRandomMovie.mockClear();
    spyMethodGetUserFavourites.mockClear();
    spyMethodGetFavouritesDetails.mockClear();
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

  test("GET - get favourite movies for a given user", async () => {
    expect.assertions(4);

    const response = await request(app)
      .get("/movie-test/favourites")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYjI4ZmU1NzBmZDg5MjQwNmFmM2YwOSIsImlhdCI6MTYwNTUzNzc5OH0.3u9o6DTXLexUDV8nSHqsRp32d42R6m3VawNIdjssxY4"
      );

    expect(response.status).toEqual(200);
    expect(favouriteController.getUserFavourites).toHaveBeenCalledTimes(1);
    expect(movieController.getFavouritesDetails).toHaveBeenCalledTimes(1);
    expect(JSON.parse(response.text)).toMatchObject({ error: null, data: [] });
  });
});
