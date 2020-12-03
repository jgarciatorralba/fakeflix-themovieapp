import UserTypes from "./user-types";

export const UserInitialState = {
  isLoggingIn: false,
  loginError: null,
  isAuthenticated: false,
  isRegistering: false,
  registerError: null,
  isResetingPassword: false,
  resetPasswordError: null,
  isForgettingPassword: false,
  forgetPasswordError: null,
  isLoggingOut: false,
  logoutError: null,
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
      };
    }
    default: {
      return state;
    }
  }
};

export default UserReducer;
