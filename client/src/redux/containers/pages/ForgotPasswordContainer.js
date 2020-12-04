import { connect } from "react-redux";

import { forgotPassword, resetMessages } from "../../user/user-actions";

import ForgotPassword from "../../../pages/ForgotPassword/ForgotPassword";

const mapStateToProps = (state) => ({
  isRequestingNewPassword: state.user.isRequestingNewPassword,
  isAuthenticated: state.user.isAuthenticated,
  forgetPasswordError: state.user.forgetPasswordError,
  forgetPasswordSuccess: state.user.forgetPasswordSuccess,
});

const mapDispatchToProps = (dispatch) => ({
  forgotPassword: ({ email }) => dispatch(forgotPassword({ email })),
  resetMessages: () => dispatch(resetMessages()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
