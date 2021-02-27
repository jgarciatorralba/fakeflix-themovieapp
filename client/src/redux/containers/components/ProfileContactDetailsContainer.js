import { connect } from "react-redux";

import { updateContact, resetMessages } from "../../user/user-actions";

import ProfileContactDetails from "../../../components/ProfileContactDetails/ProfileContactDetails";

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  isUpdatingProfile: state.user.isUpdatingProfile,
  updateProfileError: state.user.updateProfileError,
  updateProfileSuccess: state.user.updateProfileSuccess,
});

const mapDispatchToProps = (dispatch) => ({
  updateContact: ({ username, email }) =>
    dispatch(updateContact({ username, email })),
  resetMessages: () => dispatch(resetMessages()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContactDetails);
