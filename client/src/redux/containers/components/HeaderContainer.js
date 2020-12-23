import { connect } from "react-redux";

import { logout } from "../../user/user-actions";

import Header from "../../../components/Header/Header";

const mapStateToProps = (state) => ({
  isLoggingOut: state.user.isLoggingOut,
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
