import { connect } from "react-redux";

import ProfileAvatar from "../../../components/ProfileAvatar/ProfileAvatar";

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  defaultAvatar: state.user.defaultAvatar,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileAvatar);
