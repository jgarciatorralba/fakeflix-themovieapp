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

export const loginSuccess = ({
  username,
  email,
  avatar,
  defaultAvatar,
  token,
}) => ({
  type: UserTypes.LOGIN_SUCCESS,
  payload: {
    username: username,
    email: email,
    avatar: avatar,
    defaultAvatar: defaultAvatar,
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
  return async function registerThunk(dispatch) {
    dispatch(registerRequest());

    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    }).catch((error) => {
      dispatch(registerError({ errorMessage: error.message }));
    });

    const data = await res.json();
    if (data.data) {
      dispatch(
        registerSuccess({
          successMessage: data.data,
        })
      );
    } else {
      dispatch(registerError({ errorMessage: data.error }));
    }
  };
}

export function login({ email, password }) {
  return async function loginThunk(dispatch) {
    dispatch(loginRequest());

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).catch((error) => {
      dispatch(loginError({ errorMessage: error.message }));
    });

    const data = await res.json();
    if (data.data) {
      dispatch(
        loginSuccess({
          username: data.data.retrievedUser.username,
          email: data.data.retrievedUser.email,
          avatar: data.data.retrievedUser.avatar,
          token: data.data.retrievedUser.token,
          defaultAvatar: data.data.defaultAvatar,
        })
      );
    } else {
      dispatch(loginError({ errorMessage: data.error }));
    }
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
      .catch((error) =>
        dispatch(forgotPassError({ errorMessage: error.message }))
      );
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
      .catch((error) =>
        dispatch(resetPassError({ errorMessage: error.message }))
      );
  };
}

export function logout() {
  return async function logoutThunk(dispatch, getState) {
    const token = getState().user.currentUser.token;

    dispatch(logoutRequest());

    const res = await fetch("/api/user/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).catch((error) => {
      dispatch(logoutError({ errorMessage: error.message }));
    });

    const data = await res.json();
    if (data.data) {
      dispatch(
        logoutSuccess({
          successMessage: data.data,
        })
      );
    } else {
      dispatch(logoutError({ errorMessage: data.error }));
    }
  };
}

export const updatePassRequest = () => ({
  type: UserTypes.UPDATE_PASS_REQUEST,
});

export const updatePassSuccess = ({ successMessage }) => ({
  type: UserTypes.UPDATE_PASS_SUCCESS,
  payload: successMessage,
});

export const updatePassError = ({ errorMessage }) => ({
  type: UserTypes.UPDATE_PASS_ERROR,
  payload: errorMessage,
});

export function updatePassword({
  currentPassword,
  newPassword,
  confirmPassword,
}) {
  return async function updatePasswordThunk(dispatch, getState) {
    const token = getState().user.currentUser.token;

    dispatch(updatePassRequest());

    const res = await fetch("/api/user/password", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        currentPassword,
        newPassword,
        confirmPassword,
      }),
    }).catch((error) => {
      dispatch(updatePassError({ errorMessage: error.message }));
    });

    const data = await res.json();
    if (data.data) {
      dispatch(
        updatePassSuccess({
          successMessage: data.data,
        })
      );
    } else {
      dispatch(updatePassError({ errorMessage: data.error }));
    }
  };
}

export const updateContactRequest = () => ({
  type: UserTypes.UPDATE_CONTACT_REQUEST,
});

export const updateContactSuccess = ({
  successMessage,
  username,
  email,
  avatar,
  token,
}) => ({
  type: UserTypes.UPDATE_CONTACT_SUCCESS,
  payload: {
    successMessage,
    username,
    email,
    avatar,
    token,
  },
});

export const updateContactError = ({ errorMessage }) => ({
  type: UserTypes.UPDATE_CONTACT_ERROR,
  payload: errorMessage,
});

export function updateContact({ username = "", email = "" }) {
  return async function updateContactThunk(dispatch, getState) {
    const currentUser = getState().user.currentUser;
    const newUsername = username === "" ? currentUser.username : username;
    const newEmail = email === "" ? currentUser.email : email;

    dispatch(updateContactRequest());

    const res = await fetch("/api/user", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + currentUser.token,
      },
      body: JSON.stringify({
        username,
        email,
      }),
    }).catch((error) => {
      dispatch(updateContactError({ errorMessage: error.message }));
    });

    const data = await res.json();
    if (data.data) {
      dispatch(
        updateContactSuccess({
          successMessage: data.data.message,
          username: newUsername,
          email: newEmail,
          avatar: currentUser.avatar,
          token: currentUser.token,
        })
      );
    } else {
      dispatch(updateContactError({ errorMessage: data.error }));
    }
  };
}

export function updateAvatar({ avatarFile }) {
  return async function updateContactThunk(dispatch, getState) {
    const currentUser = getState().user.currentUser;

    let formData = new FormData();
    formData.append("avatar", avatarFile);

    dispatch(updateContactRequest());

    const res = await fetch("/api/user", {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + currentUser.token,
      },
      body: formData,
    }).catch((error) => {
      dispatch(updateContactError({ errorMessage: error.message }));
    });

    const data = await res.json();
    if (data.data) {
      dispatch(
        updateContactSuccess({
          successMessage: data.data.message,
          username: currentUser.username,
          email: currentUser.email,
          avatar: data.data.newAvatar,
          token: currentUser.token,
        })
      );
    } else {
      dispatch(updateContactError({ errorMessage: data.error }));
    }
  };
}

export const deactivateRequest = () => ({
  type: UserTypes.DEACTIVATE_ACCOUNT_REQUEST,
});

export const deactivateSuccess = ({ successMessage }) => ({
  type: UserTypes.DEACTIVATE_ACCOUNT_SUCCESS,
  payload: successMessage,
});

export const deactivateError = ({ errorMessage }) => ({
  type: UserTypes.DEACTIVATE_ACCOUNT_ERROR,
  payload: errorMessage,
});

export function deactivateAccount() {
  return async function deactivateThunk(dispatch, getState) {
    const token = getState().user.currentUser.token;

    dispatch(deactivateRequest());

    const res = await fetch("/api/user/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).catch((error) => {
      dispatch(deactivateError({ errorMessage: error.message }));
    });

    const data = await res.json();
    if (data.data) {
      dispatch(
        deactivateSuccess({
          successMessage: data.data,
        })
      );
    } else {
      dispatch(deactivateError({ errorMessage: data.error }));
    }
  };
}
