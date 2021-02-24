import { connect } from "react-redux";

import { resetMessages } from "../../user/user-actions";

import ProfilePassword from "../../../components/ProfilePassword/ProfilePassword";

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  resetMessages: () => dispatch(resetMessages()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePassword);
