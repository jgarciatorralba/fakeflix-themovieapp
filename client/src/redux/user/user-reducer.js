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
  isUpdatingProfile: false,
  updateProfileError: null,
  updateProfileSuccess: null,
  isDeactivatingAccount: false,
  deactivateAccountError: null,
  deactivateAccountSuccess: null,
  currentUser: {
    username: null,
    email: null,
    avatar: null,
    defaultAvatar: null,
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
          defaultAvatar: action.payload.defaultAvatar,
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
          defaultAvatar: null,
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
    case UserTypes.RESET_MESSAGES: {
      return {
        ...state,
        loginError: null,
        logoutError: null,
        logoutSuccess: null,
        registerError: null,
        registerSuccess: null,
        resetPasswordError: null,
        resetPasswordSuccess: null,
        forgetPasswordError: null,
        forgetPasswordSuccess: null,
        updateProfileError: null,
        updateProfileSuccess: null,
      };
    }
    case UserTypes.UPDATE_PASS_REQUEST: {
      return {
        ...state,
        isUpdatingProfile: true,
        updateProfileError: null,
        updateProfileSuccess: null,
      };
    }
    case UserTypes.UPDATE_PASS_ERROR: {
      return {
        ...state,
        isUpdatingProfile: false,
        updateProfileError: action.payload,
        updateProfileSuccess: null,
      };
    }
    case UserTypes.UPDATE_PASS_SUCCESS: {
      return {
        ...state,
        isUpdatingProfile: false,
        updateProfileError: null,
        updateProfileSuccess: action.payload,
      };
    }
    case UserTypes.UPDATE_CONTACT_REQUEST: {
      return {
        ...state,
        isUpdatingProfile: true,
        updateProfileError: null,
        updateProfileSuccess: null,
      };
    }
    case UserTypes.UPDATE_CONTACT_ERROR: {
      return {
        ...state,
        isUpdatingProfile: false,
        updateProfileError: action.payload,
        updateProfileSuccess: null,
      };
    }
    case UserTypes.UPDATE_CONTACT_SUCCESS: {
      return {
        ...state,
        isUpdatingProfile: false,
        updateProfileError: null,
        updateProfileSuccess: action.payload.successMessage,
        currentUser: {
          username: action.payload.username,
          email: action.payload.email,
          avatar: action.payload.avatar,
          defaultAvatar: action.payload.defaultAvatar,
          token: action.payload.token,
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default UserReducer;
