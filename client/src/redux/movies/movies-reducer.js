import MoviesTypes from "./movies-types";

export const MoviesInitialState = {
  topRatedMoviesLoading: false,
  topRatedMoviesLoadingError: null,
  topRatedMoviesFetched: false,

  nowPlayingMoviesLoading: false,
  nowPlayingMoviesLoadingError: null,
  nowPlayingMoviesFetched: false,

  upcomingMoviesLoading: false,
  upcomingMoviesLoadingError: null,
  upcomingMoviesFetched: false,

  randomMovieLoading: false,
  randomMovieLoadingError: null,
  randomMovieFetched: false,

  movieDetailsLoading: false,
  movieDetailsLoadingError: null,
  movieDetailsFetched: false,

  movieTrailersLoading: false,
  movieTrailersLoadingError: null,
  movieTrailersFetched: false,

  commentsLoading: false,
  commentsLoadingError: null,
  commentsFetched: false,

  commentUpdating: false,
  commentUpdatingError: null,

  likesLoading: false,
  likesLoadingError: null,
  likesFetched: false,

  likeUpdating: false,
  likeUpdatingError: null,

  dislikesLoading: false,
  dislikesLoadingError: null,
  dislikesFetched: false,

  dislikeUpdating: false,
  dislikeUpdatingError: null,

  favouritesLoading: false,
  favouritesLoadingError: null,
  favouritesFetched: false,

  favouriteUpdating: false,
  favouriteUpdatingError: null,

  randomMovie: {},
  favouriteMovies: [],
  topRatedMovies: [],
  nowPlayingMovies: [],
  upcomingMovies: [],

  movieDetails: {},
  movieTrailers: [],
  comments: [],
  likes: [],
  dislikes: [],
};

function MoviesReducer(state = MoviesInitialState, action) {
  switch (action.type) {
    case MoviesTypes.FETCH_TOP_RATED_REQUEST: {
      return {
        ...state,
        topRatedMoviesLoading: true,
        topRatedMoviesLoadingError: null,
      };
    }
    default: {
      return state;
    }
  }
}

export default MoviesReducer;