import { rest } from "msw";
import { setupServer } from "msw/node";

const makeHandlers = ({ moviesData }) => [
  rest.get(`/api/movie/random`, (req, res, ctx) => {
    return res(
      ctx.json({
        data: moviesData.randomMovieResponse.data,
        error: null,
      }),
      ctx.status(200)
    );
  }),

  rest.get(`/api/movie/top-rated`, (req, res, ctx) => {
    return res(
      ctx.json({
        data: {
          results: moviesData.topRatedResponse.data.results,
          totalPages: moviesData.topRatedResponse.data.totalPages,
        },
      }),
      ctx.status(200)
    );
  }),

  rest.get(`/api/movie/now-playing`, (req, res, ctx) => {
    return res(
      ctx.json({
        data: {
          results: [],
          totalPages: "1",
        },
      }),
      ctx.status(200)
    );
  }),

  rest.get(`/api/movie/upcoming`, (req, res, ctx) => {
    return res(
      ctx.json({
        data: {
          results: [],
          totalPages: "1",
        },
      }),
      ctx.status(200)
    );
  }),

  rest.get(`/api/movie/favourites`, (req, res, ctx) => {
    return res(
      ctx.json({
        data: [],
        error: null,
      }),
      ctx.status(200)
    );
  }),

  rest.post(`/api/favourite/:movieId`, (req, res, ctx) => {
    return res(
      ctx.json({
        data: moviesData.favouriteResponse.data,
        error: null,
      }),
      ctx.status(200)
    );
  }),
];

const makeTestingServer = (data) => setupServer(...makeHandlers(data));

export default makeTestingServer;

export { makeHandlers };
