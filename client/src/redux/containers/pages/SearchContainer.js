import { connect } from "react-redux";

import {} from "../../movies/movies-actions";

import Search from "../../../pages/Search/Search";

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
