import { connect } from "react-redux";

import ProfileAvatar from "../../../components/ProfileAvatar/ProfileAvatar";

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileAvatar);
