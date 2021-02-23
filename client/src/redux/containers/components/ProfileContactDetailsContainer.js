import { connect } from "react-redux";

import ProfileContactDetails from "../../../components/ProfileContactDetails/ProfileContactDetails";

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContactDetails);
