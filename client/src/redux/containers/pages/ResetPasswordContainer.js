import { connect } from "react-redux";

import { resetPassword, resetMessages } from "../../user/user-actions";

import ResetPassword from "../../../pages/ResetPassword/ResetPassword";

const mapStateToProps = (state) => ({
  isResetingPassword: state.user.isResetingPassword,
  isAuthenticated: state.user.isAuthenticated,
  resetPasswordError: state.user.resetPasswordError,
  resetPasswordSuccess: state.user.resetPasswordSuccess,
});

const mapDispatchToProps = (dispatch) => ({
  resetPassword: ({ password }) => dispatch(resetPassword({ password })),
  resetMessages: () => dispatch(resetMessages()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
