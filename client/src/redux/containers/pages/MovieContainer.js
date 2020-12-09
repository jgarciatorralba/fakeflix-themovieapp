import { connect } from "react-redux";

import Movie from "../../../pages/Movie/Movie";

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Movie);
