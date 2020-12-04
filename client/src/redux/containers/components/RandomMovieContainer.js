import { connect } from "react-redux";

import { fetchRandomMovie } from "../../movies/movies-actions";

import RandomMovie from "../../../components/RandomMovie/RandomMovie";

const mapStateToProps = (state) => ({
  randomMovieLoading: state.movies.randomMovieLoading,
  randomMovieLoadingError: state.movies.randomMovieLoadingError,
  randomMovieFetched: state.movies.randomMovieFetched,
  randomMovie: state.movies.randomMovie,
});

const mapDispatchToProps = (dispatch) => ({
  fetchRandomMovie: () => dispatch(fetchRandomMovie()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RandomMovie);
