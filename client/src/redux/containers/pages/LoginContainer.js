import { connect } from "react-redux";

import { login } from "../../user/user-actions";

import Login from "../../../pages/Login/Login";

const mapStateToProps = (state) => ({
  isLoggingIn: state.user.isLoggingIn,
  isAuthenticated: state.user.isAuthenticated,
  loginError: state.user.loginError,
});

const mapDispatchToProps = (dispatch) => ({
  login: ({ email, password }) => dispatch(login({ email, password })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
