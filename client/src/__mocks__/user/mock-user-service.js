import { rest } from "msw";
import { setupServer } from "msw/node";

const makeHandlers = ({ userData: { testUser, testPayload } }) => [
  rest.post(`/api/register`, (req, res, ctx) => {
    return res(
      ctx.json({
        data: testPayload.successMessage,
        error: null,
      }),
      ctx.status(200)
    );
  }),

  rest.post(`/api/login`, (req, res, ctx) => {
    return res(
      ctx.json({
        data: {
          retrievedUser: {
            username: testPayload.username,
            email: testPayload.email,
            avatar: testPayload.avatar,
            token: testPayload.token,
          },
          defaultAvatar: testPayload.defaultAvatar,
        },
        error: null,
      }),
      ctx.status(200)
    );
  }),

  rest.post(`/api/user/logout`, (req, res, ctx) => {
    return res(
      ctx.json({
        data: testPayload.logoutMessage,
        error: null,
      }),
      ctx.status(200)
    );
  }),
];

const makeTestingServer = (data) => setupServer(...makeHandlers(data));

export default makeTestingServer;

export { makeHandlers };
