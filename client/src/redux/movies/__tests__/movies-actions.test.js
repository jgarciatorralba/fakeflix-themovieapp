/* eslint-disable jest/no-mocks-import */
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";

import {
  fetchRandomMovie,
  fetchTopRated,
  addFavourite,
} from "../movies-actions";
import MoviesTypes from "../movies-types";

import makeTestingServer from "../../../__mocks__/movies/mock-movies-service";

import randomMovieResponse from "../../../__mocks__/movies/responses/random-movie.json";
import topRatedResponse from "../../../__mocks__/movies/responses/top-rated.json";
import favouriteResponse from "../../../__mocks__/movies/responses/add-favourite.json";

const moviesData = {
  randomMovieResponse,
  topRatedResponse,
  favouriteResponse,
};

const server = makeTestingServer({ moviesData });

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Movies thunk actions tests", () => {
  const mockStore = configureStore([thunk]);

  test("Fetch random movie and dispatch results", async () => {
    const expectedActions = [
      {
        type: MoviesTypes.FETCH_RANDOM_REQUEST,
      },
      {
        type: MoviesTypes.FETCH_RANDOM_SUCCESS,
        payload: moviesData.randomMovieResponse.data,
      },
    ];

    const store = mockStore({
      user: {
        currentUser: {
          token: "a_valid_token",
        },
      },
    });
    await store.dispatch(fetchRandomMovie());

    expect(store.getActions()).toEqual(expectedActions);
  });

  test("Fetch top rated movies and dispatch results", async () => {
    const expectedActions = [
      {
        type: MoviesTypes.FETCH_TOP_RATED_REQUEST,
      },
      {
        type: MoviesTypes.FETCH_TOP_RATED_SUCCESS,
        payload: {
          topRatedMovies: moviesData.topRatedResponse.data.results,
          topRatedPages: moviesData.topRatedResponse.data.totalPages,
        },
      },
    ];

    const store = mockStore({
      user: {
        currentUser: {
          token: "a_valid_token",
        },
      },
    });
    await store.dispatch(fetchTopRated(1));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test("Add movie to favourites and dispatch results", async () => {
    const expectedActions = [
      {
        type: MoviesTypes.FAVOURITE_UPDATING,
      },
      {
        type: MoviesTypes.ADD_FAVOURITE,
      },
    ];

    const store = mockStore({
      user: {
        currentUser: {
          token: "a_valid_token",
        },
      },
    });
    await store.dispatch(addFavourite(682377));

    expect(store.getActions()).toEqual(expectedActions);
  });
});
