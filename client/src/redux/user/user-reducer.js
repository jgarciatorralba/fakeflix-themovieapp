import UserTypes from "./user-types";

export const UserInitialState = {
  isLoggingIn: false,
  loginError: null,
  isAuthenticated: false,
  isRegistering: false,
  registerError: null,
  registerSuccess: null,
  isResetingPassword: false,
  resetPasswordError: null,
  resetPasswordSuccess: null,
  isRequestingNewPassword: false,
  forgetPasswordError: null,
  forgetPasswordSuccess: null,
  isLoggingOut: false,
  logoutError: null,
  logoutSuccess: null,
  currentUser: {
    username: null,
    email: null,
    avatar: null,
    token: null,
  },
};

const UserReducer = (state = UserInitialState, action) => {
  switch (action.type) {
    case UserTypes.REGISTER_REQUEST: {
      return {
        ...state,
        isRegistering: true,
        registerError: null,
        registerSuccess: null,
      };
    }
    case UserTypes.REGISTER_SUCCESS: {
      return {
        ...state,
        isRegistering: false,
        registerError: null,
        registerSuccess: action.payload,
      };
    }
    case UserTypes.REGISTER_ERROR: {
      return {
        ...state,
        isRegistering: false,
        registerError: action.payload,
        registerSuccess: null,
      };
    }
    case UserTypes.LOGIN_REQUEST: {
      return {
        ...state,
        isLoggingIn: true,
        loginError: null,
      };
    }
    case UserTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isLoggingIn: false,
        loginError: null,
        isAuthenticated: true,
        currentUser: {
          username: action.payload.username,
          email: action.payload.email,
          avatar: action.payload.avatar,
          token: action.payload.token,
        },
      };
    }
    case UserTypes.LOGIN_ERROR: {
      return {
        ...state,
        isLoggingIn: false,
        loginError: action.payload,
      };
    }
    case UserTypes.FORGOT_PASS_REQUEST: {
      return {
        ...state,
        isRequestingNewPassword: true,
        forgetPasswordError: null,
        forgetPasswordSuccess: null,
      };
    }
    case UserTypes.FORGOT_PASS_SUCCESS: {
      return {
        ...state,
        isRequestingNewPassword: false,
        forgetPasswordError: null,
        forgetPasswordSuccess: action.payload,
      };
    }
    case UserTypes.FORGOT_PASS_ERROR: {
      return {
        ...state,
        isRequestingNewPassword: false,
        forgetPasswordError: action.payload,
        forgetPasswordSuccess: null,
      };
    }
    case UserTypes.RESET_PASS_REQUEST: {
      return {
        ...state,
        isResetingPassword: true,
        resetPasswordError: null,
        resetPasswordSuccess: null,
      };
    }
    case UserTypes.RESET_PASS_SUCCESS: {
      return {
        ...state,
        isResetingPassword: false,
        resetPasswordError: null,
        resetPasswordSuccess: action.payload,
      };
    }
    case UserTypes.RESET_PASS_ERROR: {
      return {
        ...state,
        isResetingPassword: false,
        resetPasswordError: action.payload,
        resetPasswordSuccess: null,
      };
    }
    case UserTypes.LOGOUT_REQUEST: {
      return {
        ...state,
        isLoggingOut: true,
        logoutError: null,
        logoutSuccess: null,
      };
    }
    case UserTypes.LOGOUT_SUCCESS: {
      return {
        ...state,
        isLoggingOut: false,
        logoutError: null,
        logoutSuccess: action.payload,
        isAuthenticated: false,
        currentUser: {
          username: null,
          email: null,
          avatar: null,
          token: null,
        },
      };
    }
    case UserTypes.LOGOUT_ERROR: {
      return {
        ...state,
        isLoggingOut: false,
        logoutError: action.payload,
        logoutSuccess: null,
      };
    }
    default: {
      return state;
    }
  }
};

export default UserReducer;