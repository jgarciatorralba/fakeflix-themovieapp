import { connect } from "react-redux";

import { updateAvatar, resetMessages } from "../../user/user-actions";

import ProfileAvatar from "../../../components/ProfileAvatar/ProfileAvatar";

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  defaultAvatar: state.user.defaultAvatar,
  isUpdatingProfile: state.user.isUpdatingProfile,
  updateProfileError: state.user.updateProfileError,
  updateProfileSuccess: state.user.updateProfileSuccess,
});

const mapDispatchToProps = (dispatch) => ({
  updateAvatar: ({ avatarFile }) => dispatch(updateAvatar({ avatarFile })),
  resetMessages: () => dispatch(resetMessages()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileAvatar);
