import MoviesTypes from "./movies-types";

export const MoviesInitialState = {
  randomMovieLoading: false,
  randomMovieLoadingError: null,
  randomMovieFetched: false,
  randomMovie: {},

  topRatedMoviesLoading: false,
  topRatedMoviesLoadingError: null,
  topRatedMoviesFetched: false,
  topRatedMovies: [],
  topRatedPages: null,

  nowPlayingMoviesLoading: false,
  nowPlayingMoviesLoadingError: null,
  nowPlayingMoviesFetched: false,

  upcomingMoviesLoading: false,
  upcomingMoviesLoadingError: null,
  upcomingMoviesFetched: false,

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

  favouriteMovies: [],
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
    case MoviesTypes.FETCH_RANDOM_REQUEST: {
      return {
        ...state,
        randomMovieLoading: true,
        randomMovieLoadingError: null,
        randomMovieFetched: false,
        randomMovie: {},
      };
    }
    case MoviesTypes.FETCH_RANDOM_SUCCESS: {
      return {
        ...state,
        randomMovieLoading: false,
        randomMovieLoadingError: null,
        randomMovieFetched: true,
        randomMovie: action.payload,
      };
    }
    case MoviesTypes.FETCH_RANDOM_ERROR: {
      return {
        ...state,
        randomMovieLoading: false,
        randomMovieLoadingError: action.payload,
        randomMovieFetched: false,
        randomMovie: {},
      };
    }
    case MoviesTypes.FETCH_TOP_RATED_REQUEST: {
      return {
        ...state,
        topRatedMoviesLoading: true,
        topRatedMoviesLoadingError: null,
        topRatedMoviesFetched: false,
        topRatedMovies: [],
        topRatedPages: null,
      };
    }
    case MoviesTypes.FETCH_TOP_RATED_SUCCESS: {
      return {
        ...state,
        topRatedMoviesLoading: false,
        topRatedMoviesLoadingError: null,
        topRatedMoviesFetched: true,
        topRatedMovies: action.payload.topRatedMovies,
        topRatedPages: action.payload.topRatedPages,
      };
    }
    case MoviesTypes.FETCH_TOP_RATED_ERROR: {
      return {
        ...state,
        topRatedMoviesLoading: false,
        topRatedMoviesLoadingError: action.payload,
        topRatedMoviesFetched: false,
        topRatedMovies: [],
        topRatedPages: null,
      };
    }
    default: {
      return state;
    }
  }
}

export default MoviesReducer;
