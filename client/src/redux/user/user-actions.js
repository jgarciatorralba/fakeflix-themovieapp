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

export const resetMessages = () => ({
  type: UserTypes.RESET_MESSAGES,
});

export function register({ username, email, password }) {
  return function registerThunk(dispatch) {
    dispatch(registerRequest());

    fetch("/api/register", {
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
        if (data.data) {
          dispatch(
            registerSuccess({
              successMessage: data.data,
            })
          );
        } else {
          dispatch(registerError({ errorMessage: data.error }));
        }
      })
      .catch((error) => console.log(error));
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
        if (data.data) {
          dispatch(
            loginSuccess({
              username: data.data.username,
              email: data.data.email,
              avatar: data.data.avatar,
              token: data.data.token,
            })
          );
        } else {
          dispatch(loginError({ errorMessage: data.error }));
        }
      })
      .catch((error) => console.log(error));
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
        if (data.data) {
          dispatch(
            forgotPassSuccess({
              successMessage: data.data,
            })
          );
        } else {
          dispatch(forgotPassError({ errorMessage: data.error }));
        }
      })
      .catch((error) => console.log(error));
  };
}

export function resetPassword({ password, token }) {
  return function resetPasswordThunk(dispatch) {
    dispatch(resetPassRequest());

    fetch("/api/password/reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          dispatch(
            resetPassSuccess({
              successMessage: data.data,
            })
          );
        } else {
          dispatch(resetPassError({ errorMessage: data.error }));
        }
      })
      .catch((error) => console.log(error));
  };
}

export function logout() {
  return function logoutThunk(dispatch, getState) {
    const token = getState().user.currentUser.token;

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
        if (data.data) {
          dispatch(
            logoutSuccess({
              successMessage: data.data,
            })
          );
        } else {
          dispatch(logoutError({ errorMessage: data.error }));
        }
      })
      .catch((error) => console.log(error));
  };
}
