import { connect } from "react-redux";

import { logout } from "../../user/user-actions";

import Header from "../../../components/Header/Header";

const mapStateToProps = (state) => ({
  isLoggingOut: state.user.isLoggingOut,
  currentUser: state.user.currentUser,
  defaultAvatar: state.user.defaultAvatar,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
