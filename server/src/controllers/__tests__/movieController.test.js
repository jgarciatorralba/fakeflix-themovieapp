// Import dependencies
import axios from "axios";

// Import controller
import movieController from "../movieController.js";

let spyMethodAxiosGet = null;

describe("Testing responses from external API (TMDb)...", () => {
  beforeAll(async () => {
    spyMethodAxiosGet = jest.spyOn(axios, "get");
  });

  beforeEach(async () => {
    spyMethodAxiosGet.mockClear();
  });

  afterAll(async () => {
    spyMethodAxiosGet.mockClear();
  });

  test("Get configuration object", async () => {
    const response = await movieController.getConfig();

    const expectedObject = {
      profile_sizes: ["w45", "w185", "h632", "original"],
    };

    expect.assertions(2);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(response.images).toEqual(expect.objectContaining(expectedObject));
  });

  test("Get random movie", async () => {
    const response = await movieController.getRandomMovie();

    expect.assertions(3);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(response).toBeDefined();
    expect(response).toHaveProperty("overview");
  });

  test("Get details for favourite movies", async () => {
    const response = await movieController.getFavouritesDetails(["11"]);

    expect.assertions(4);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(response).toBeDefined();
    expect(response).toHaveLength(1);
    expect(response[0]).toHaveProperty("title", "Star Wars");
  });

  test("Get top rated movies", async () => {
    const response = await movieController.getTopRated(1);

    expect.assertions(4);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(response).toBeDefined();
    expect(response.results).toHaveLength(20);
    expect(response.results[Math.floor(Math.random() * 20)]).toHaveProperty(
      "backdrop_path"
    );
  });

  test("Get now playing movies", async () => {
    const response = await movieController.getNowPlaying(33);

    expect.assertions(4);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(response).toBeDefined();
    expect(response.results).toHaveLength(20);
    expect(response.results[Math.floor(Math.random() * 20)]).toHaveProperty(
      "poster_path"
    );
  });

  test("Get upcoming movies", async () => {
    const response = await movieController.getUpcoming(5);

    expect.assertions(4);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(response).toBeDefined();
    expect(response.results).toHaveLength(20);
    expect(response.results[Math.floor(Math.random() * 20)]).toHaveProperty(
      "release_date"
    );
  });

  test("Get movie details for a given 'movie_id'", async () => {
    const response = await movieController.getMovieDetails(122);

    const expectedObject = {
      id: 119,
      name: "The Lord of the Rings Collection",
    };

    expect.assertions(4);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(response).toBeDefined();
    expect(response).toHaveProperty("budget");
    expect(response.belongs_to_collection).toEqual(
      expect.objectContaining(expectedObject)
    );
  });

  test("Get movie trailers for a given 'movie_id'", async () => {
    const response = await movieController.getMovieTrailers(122);

    expect.assertions(4);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(response).toBeDefined();
    expect(response.length).toBeGreaterThanOrEqual(0);
    expect(
      response[Math.floor(Math.random() * response.length)]
    ).toHaveProperty("name");
  });
});
