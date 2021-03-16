import { connect } from "react-redux";

import { deactivateAccount, resetMessages } from "../../user/user-actions";

import ProfileDeactivateAccount from "../../../components/ProfileDeactivateAccount/ProfileDeactivateAccount";

const mapStateToProps = (state) => ({
  isDeactivatingAccount: state.user.isDeactivatingAccount,
  deactivateAccountError: state.user.deactivateAccountError,
  deactivateAccountSuccess: state.user.deactivateAccountSuccess,
});

const mapDispatchToProps = (dispatch) => ({
  deactivateAccount: () => dispatch(deactivateAccount()),
  resetMessages: () => dispatch(resetMessages()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileDeactivateAccount);
