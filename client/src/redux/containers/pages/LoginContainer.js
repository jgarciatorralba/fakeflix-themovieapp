import { connect } from "react-redux";

import { login } from "../../user/user-actions";

import Login from "../../../pages/Login/Login";

const mapStateToProps = (state) => ({
  isLoggingIn: state.user.isLoggingIn,
  isAuthenticated: state.user.isAuthenticated,
  loginError: state.user.loginError,
  logoutError: state.user.logoutError,
  logoutSuccess: state.user.logoutSuccess,
});

const mapDispatchToProps = (dispatch) => ({
  login: ({ email, password }) => dispatch(login({ email, password })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
