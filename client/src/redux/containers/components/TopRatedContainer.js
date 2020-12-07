import { connect } from "react-redux";

import { fetchTopRated } from "../../movies/movies-actions";

import TopRated from "../../../components/TopRated/TopRated";

const mapStateToProps = (state) => ({
  topRatedMoviesLoading: state.movies.topRatedMoviesLoading,
  topRatedMoviesLoadingError: state.movies.topRatedMoviesLoadingError,
  topRatedMoviesFetched: state.movies.topRatedMoviesFetched,
  topRatedMovies: state.movies.topRatedMovies,
  topRatedPages: state.movies.topRatedPages,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTopRated: (page) => dispatch(fetchTopRated(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopRated);
