/* eslint-disable jest/no-mocks-import */
import React from "react";
import App from "../App";
import { renderWithReduxAndRouter } from "../utils/tests";
import { waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import makeTestingServer from "../__mocks__/make-testing-server";

import randomMovieResponse from "../__mocks__/movies/responses/random-movie.json";
import topRatedResponse from "../__mocks__/movies/responses/top-rated.json";
import favouriteResponse from "../__mocks__/movies/responses/favourite.json";

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

    describe("Banner", () => {
      test("should contain information about a random movie", async () => {
        const { getByText } = renderWithReduxAndRouter(<App />, undefined, {
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
        });

        await waitFor(() =>
          expect(getByText("Chick Fight")).toBeInTheDocument()
        );
      });
    });

    describe("Movie section", () => {
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

  describe("Login page", () => {
    describe("Login form", () => {
      test("should contain the right input fields", () => {
        const { getByPlaceholderText, getByRole } = renderWithReduxAndRouter(
          <App />,
          undefined,
          {
            initialState: {
              user: {
                isAuthenticated: false,
                currentUser: {
                  username: null,
                  email: null,
                  avatar: null,
                  token: null,
                },
              },
            },
          }
        );

        expect(
          getByPlaceholderText("Email address", { exact: false })
        ).toBeInTheDocument();
        expect(
          getByPlaceholderText("Password", { exact: false })
        ).toBeInTheDocument();
        expect(getByRole("button", { name: "Sign in" })).toBeInTheDocument();
      });

      test("should be able to log in a user", async () => {
        const {
          getByPlaceholderText,
          getByRole,
          getByText,
        } = renderWithReduxAndRouter(<App />, undefined, {
          initialState: {
            user: {
              isAuthenticated: false,
              currentUser: {
                username: null,
                email: null,
                avatar: null,
                token: null,
              },
            },
          },
        });

        userEvent.type(
          getByPlaceholderText("Email address", { exact: false }),
          "invented_email@mail.com"
        );
        userEvent.type(
          getByPlaceholderText("Password", { exact: false }),
          "password"
        );

        userEvent.click(getByRole("button", { name: "Sign in" }));

        await waitFor(() => {
          expect(
            getByText("More information", { exact: false })
          ).toBeInTheDocument();
        });

        expect(getByText("Favourites")).toBeInTheDocument();
        expect(getByText("Top Rated")).toBeInTheDocument();
        expect(getByText("Now Playing")).toBeInTheDocument();
        expect(getByText("Upcoming")).toBeInTheDocument();
      });
    });

    describe("Register link", () => {
      test("should be able to redirect to the Register page", async () => {
        const { getByPlaceholderText, getByRole } = renderWithReduxAndRouter(
          <App />,
          undefined,
          {
            initialState: {
              user: {
                isAuthenticated: false,
                currentUser: {
                  username: null,
                  email: null,
                  avatar: null,
                  token: null,
                },
              },
            },
          }
        );

        userEvent.click(getByRole("link", { name: "Register here ." }));

        await waitFor(() => {
          expect(
            getByPlaceholderText("Username", { exact: false })
          ).toBeInTheDocument();
        });

        expect(
          getByRole("button", { name: "Create account" })
        ).toBeInTheDocument();
      });
    });
  });

  describe("Register page", () => {
    describe("Register form", () => {
      test("should be able to register a new user", async () => {
        const {
          getByPlaceholderText,
          getByRole,
          getByText,
        } = renderWithReduxAndRouter(<App />, "/register", {
          initialState: {
            user: {
              isAuthenticated: false,
              currentUser: {
                username: null,
                email: null,
                avatar: null,
                token: null,
              },
            },
          },
        });

        userEvent.type(
          getByPlaceholderText("Username", { exact: false }),
          "a_random_username"
        );
        userEvent.type(
          getByPlaceholderText("Email address", { exact: false }),
          "valid-email-address@domain.com"
        );
        userEvent.type(
          getByPlaceholderText("Password", { exact: false }),
          "my_private_password"
        );

        userEvent.click(getByRole("button", { name: "Create account" }));

        await waitFor(() => {
          expect(
            getByText("Register was successful!", { exact: false })
          ).toBeInTheDocument();
        });
      });
    });
  });
});
