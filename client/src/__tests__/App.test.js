/* eslint-disable jest/no-mocks-import */
import React from "react";
import App from "../App";
import { renderWithReduxAndRouter } from "../utils/tests";
import { waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import makeTestingServer from "../__mocks__/make-testing-server";

import randomMovieResponse from "../__mocks__/movies/random-movie.json";
import topRatedResponse from "../__mocks__/movies/top-rated.json";
import favouriteResponse from "../__mocks__/movies/favourite.json";

const testUser = {
  username: "test_username",
  email: "test_email",
  password: "test_password",
};

const testPayload = {
  username: "test_username",
  email: "test_email",
  avatar: "test_avatar",
  token: "test_token",
  successMessage: "Register was successful!",
  logoutMessage: "User logged out!",
};

const userData = {
  testUser,
  testPayload,
};

describe("Overall app behaviour", () => {
  const server = makeTestingServer({
    userData,
    moviesData: {
      randomMovieResponse,
      topRatedResponse,
      favouriteResponse,
    },
  });

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test("should be defined", () => {
    expect(App).toBeDefined();
  });

  describe("Homepage", () => {
    describe("Header", () => {
      test("should contain the navbar", () => {
        const { getByText, getByRole } = renderWithReduxAndRouter(
          <App />,
          undefined,
          {
            initialState: {
              user: {
                isAuthenticated: true,
                currentUser: {
                  avatar: testPayload.avatar,
                },
              },
            },
          }
        );

        expect(getByText("Fakeflix", { exact: false })).toBeInTheDocument();
        expect(getByRole("img")).toHaveAttribute("src", testPayload.avatar);
      });
    });

    describe("Top Rated", () => {
      test("should contain top rated movies", async () => {
        const { getAllByAltText } = renderWithReduxAndRouter(
          <App />,
          undefined,
          {
            initialState: {
              user: {
                isAuthenticated: true,
                currentUser: {
                  avatar: testPayload.avatar,
                },
              },
              movies: {
                favouriteMovies: [],
                topRatedMovies: [],
                nowPlayingMovies: [],
                upcomingMovies: [],
                randomMovie: {},
              },
            },
          }
        );

        await waitFor(() =>
          expect(getAllByAltText("Movie poster")).toHaveLength(20)
        );
      });
    });
  });
});
