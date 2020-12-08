import { connect } from "react-redux";

import { fetchNowPlaying } from "../../movies/movies-actions";

import NowPlaying from "../../../components/NowPlaying/NowPlaying";

const mapStateToProps = (state) => ({
  nowPlayingMoviesLoading: state.movies.nowPlayingMoviesLoading,
  nowPlayingMoviesLoadingError: state.movies.nowPlayingMoviesLoadingError,
  nowPlayingMoviesFetched: state.movies.nowPlayingMoviesFetched,
  nowPlayingMovies: state.movies.nowPlayingMovies,
  nowPlayingPages: state.movies.nowPlayingPages,
});

const mapDispatchToProps = (dispatch) => ({
  fetchNowPlaying: (page) => dispatch(fetchNowPlaying(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NowPlaying);
