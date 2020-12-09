import { connect } from "react-redux";

import { fetchMovieDetails } from "../../movies/movies-actions";

import Movie from "../../../pages/Movie/Movie";

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
  movieDetailsLoading: state.movies.movieDetailsLoading,
  movieDetailsLoadingError: state.movies.movieDetailsLoadingError,
  movieDetailsFetched: state.movies.movieDetailsFetched,
  movieDetails: state.movies.movieDetails,
});

const mapDispatchToProps = (dispatch) => ({
  fetchMovieDetails: (movie_id) => dispatch(fetchMovieDetails(movie_id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Movie);
