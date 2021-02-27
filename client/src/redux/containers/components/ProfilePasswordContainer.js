import { connect } from "react-redux";

import { updatePassword, resetMessages } from "../../user/user-actions";

import ProfilePassword from "../../../components/ProfilePassword/ProfilePassword";

const mapStateToProps = (state) => ({
  isUpdatingProfile: state.user.isUpdatingProfile,
  updateProfileError: state.user.updateProfileError,
  updateProfileSuccess: state.user.updateProfileSuccess,
});

const mapDispatchToProps = (dispatch) => ({
  updatePassword: ({ currentPassword, newPassword, confirmPassword }) =>
    dispatch(updatePassword({ currentPassword, newPassword, confirmPassword })),
  resetMessages: () => dispatch(resetMessages()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePassword);
