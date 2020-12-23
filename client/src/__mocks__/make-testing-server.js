import { setupServer } from "msw/node";

import { makeHandlers as makeUserServiceHandlers } from "./user/mock-user-service";
import { makeHandlers as makeMoviesServiceHandlers } from "./movies/mock-movies-service";

const makeTestingServer = (data) =>
  setupServer(
    ...makeUserServiceHandlers(data),
    ...makeMoviesServiceHandlers(data)
  );

export default makeTestingServer;
