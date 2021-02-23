import { connect } from "react-redux";

import ProfilePassword from "../../../components/ProfilePassword/ProfilePassword";

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePassword);
