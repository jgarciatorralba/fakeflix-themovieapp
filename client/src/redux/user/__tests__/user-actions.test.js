/* eslint-disable jest/no-mocks-import */
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";

import { register, login, logout } from "../user-actions";
import UserTypes from "../user-types";

import makeTestingServer from "../../../__mocks__/user/mock-user-service";

const testUser = {
  username: "test_username",
  email: "test_email",
  password: "test_password",
};

const testPayload = {
  username: "test_username",
  email: "test_email",
  avatar: "test_avatar",
  defaultAvatar: "test_default_avatar",
  token: "test_token",
  successMessage: "Register was successful!",
  logoutMessage: "User logged out!",
};

const userData = {
  testUser,
  testPayload,
};

const server = makeTestingServer({ userData });

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("User thunk actions tests", () => {
  const mockStore = configureStore([thunk]);

  test("Register and dispatch results", async () => {
    const expectedActions = [
      {
        type: UserTypes.REGISTER_REQUEST,
      },
      {
        type: UserTypes.REGISTER_SUCCESS,
        payload: testPayload.successMessage,
      },
    ];

    const store = mockStore();
    await store.dispatch(
      register({
        username: testUser.username,
        email: testUser.email,
        password: testUser.password,
      })
    );

    expect(store.getActions()).toEqual(expectedActions);
  });

  test("Log in and dispatch results", async () => {
    const expectedActions = [
      {
        type: UserTypes.LOGIN_REQUEST,
      },
      {
        type: UserTypes.LOGIN_SUCCESS,
        payload: {
          username: testPayload.username,
          email: testPayload.email,
          avatar: testPayload.avatar,
          token: testPayload.token,
          defaultAvatar: testPayload.defaultAvatar,
        },
      },
    ];

    const store = mockStore();
    await store.dispatch(
      login({
        email: testUser.email,
        password: testUser.password,
      })
    );

    expect(store.getActions()).toEqual(expectedActions);
  });

  test("Log out and dispatch results", async () => {
    const expectedActions = [
      {
        type: UserTypes.LOGOUT_REQUEST,
      },
      {
        type: UserTypes.LOGOUT_SUCCESS,
        payload: testPayload.logoutMessage,
      },
    ];

    const store = mockStore({
      user: {
        currentUser: {
          token: "a_valid_token",
        },
      },
    });
    await store.dispatch(logout());

    expect(store.getActions()).toEqual(expectedActions);
  });
});
