import UserTypes from "./user-types";

export const registerRequest = () => ({
  type: UserTypes.REGISTER_REQUEST,
});

export const registerSuccess = ({ successMessage }) => ({
  type: UserTypes.REGISTER_SUCCESS,
  payload: successMessage,
});

export const registerError = ({ errorMessage }) => ({
  type: UserTypes.REGISTER_ERROR,
  payload: errorMessage,
});

export const loginRequest = () => ({
  type: UserTypes.LOGIN_REQUEST,
});

export const loginSuccess = ({ username, email, avatar, token }) => ({
  type: UserTypes.LOGIN_SUCCESS,
  payload: {
    username: username,
    email: email,
    avatar: avatar,
    token: token,
  },
});

export const loginError = ({ errorMessage }) => ({
  type: UserTypes.LOGIN_ERROR,
  payload: errorMessage,
});

export const forgotPassRequest = () => ({
  type: UserTypes.FORGOT_PASS_REQUEST,
});

export const forgotPassSuccess = ({ successMessage }) => ({
  type: UserTypes.FORGOT_PASS_SUCCESS,
  payload: successMessage,
});

export const forgotPassError = ({ errorMessage }) => ({
  type: UserTypes.FORGOT_PASS_ERROR,
  payload: errorMessage,
});

export const resetPassRequest = () => ({
  type: UserTypes.RESET_PASS_REQUEST,
});

export const resetPassSuccess = ({ successMessage }) => ({
  type: UserTypes.RESET_PASS_SUCCESS,
  payload: successMessage,
});

export const resetPassError = ({ errorMessage }) => ({
  type: UserTypes.RESET_PASS_ERROR,
  payload: errorMessage,
});

export const logoutRequest = () => ({
  type: UserTypes.LOGOUT_REQUEST,
});

export const logoutSuccess = ({ successMessage }) => ({
  type: UserTypes.LOGOUT_SUCCESS,
  payload: successMessage,
});

export const logoutError = ({ errorMessage }) => ({
  type: UserTypes.LOGOUT_ERROR,
  payload: errorMessage,
});

export function register({ username, email, password }) {
  return function registerThunk(dispatch) {
    dispatch(registerRequest());

    fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(registerSuccess(data.data));
      })
      .catch((error) => dispatch(registerError(error.error)));
  };
}

export function login({ email, password }) {
  return function loginThunk(dispatch) {
    dispatch(loginRequest());

    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(
          loginSuccess({
            username: data.data.username,
            email: data.data.email,
            avatar: data.data.avatar,
            token: data.data.token,
          })
        );
      })
      .catch((error) => dispatch(loginError(error.error)));
  };
}

export function forgotPassword({ email }) {
  return function forgotPasswordThunk(dispatch) {
    dispatch(forgotPassRequest());

    fetch("/api/password/forgot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(forgotPassSuccess(data.data));
      })
      .catch((error) => dispatch(forgotPassError(error.error)));
  };
}

export function resetPassword({ password }) {
  return function resetPasswordThunk(dispatch) {
    dispatch(resetPassRequest());

    let resetToken = "";
    if (localStorage.getItem("resetToken") !== null) {
      resetToken = localStorage.getItem("resetToken");
      localStorage.removeItem("resetToken");
    }

    fetch("/api/password/reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + resetToken,
      },
      body: JSON.stringify({
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(resetPassSuccess(data.data));
      })
      .catch((error) => dispatch(resetPassError(error.error)));
  };
}

export function logout() {
  return function logoutThunk(dispatch, getState) {
    const token = getState().user.currentUser.token;

    if (token) {
      dispatch(logoutRequest());

      fetch("/api/user/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch(logoutSuccess(data.data));
        })
        .catch((error) => dispatch(logoutError(error.error)));
    } else {
      dispatch(logoutError("Missing access token"));
    }
  };
}
