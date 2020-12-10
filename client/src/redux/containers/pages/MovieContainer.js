import { connect } from "react-redux";

import {
  fetchMovieDetails,
  fetchFavourites,
  addFavourite,
  removeFavourite,
} from "../../movies/movies-actions";

import Movie from "../../../pages/Movie/Movie";

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
  movieDetailsLoading: state.movies.movieDetailsLoading,
  movieDetailsLoadingError: state.movies.movieDetailsLoadingError,
  movieDetailsFetched: state.movies.movieDetailsFetched,
  movieDetails: state.movies.movieDetails,

  favouriteMovies: state.movies.favouriteMovies,
  favouriteUpdating: state.movies.favouriteUpdating,
  favouriteUpdatingError: state.movies.favouriteUpdatingError,
  favouriteAdded: state.movies.favouriteAdded,
  favouriteRemoved: state.movies.favouriteRemoved,
});

const mapDispatchToProps = (dispatch) => ({
  fetchMovieDetails: (movie_id) => dispatch(fetchMovieDetails(movie_id)),

  fetchFavourites: (movie_id) => dispatch(fetchFavourites(movie_id)),
  addFavourite: (movie_id) => dispatch(addFavourite(movie_id)),
  removeFavourite: (movie_id) => dispatch(removeFavourite(movie_id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Movie);
