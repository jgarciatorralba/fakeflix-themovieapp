import { connect } from "react-redux";

import { register, resetMessages } from "../../user/user-actions";

import Register from "../../../pages/Register/Register";

const mapStateToProps = (state) => ({
  isRegistering: state.user.isRegistering,
  isAuthenticated: state.user.isAuthenticated,
  registerError: state.user.registerError,
  registerSuccess: state.user.registerSuccess,
});

const mapDispatchToProps = (dispatch) => ({
  register: ({ username, email, password }) =>
    dispatch(register({ username, email, password })),
  resetMessages: () => dispatch(resetMessages()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
