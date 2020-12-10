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

  favouritesLoading: false,
  favouritesLoadingError: null,
  favouritesFetched: false,
  favouriteMovies: [],

  favouriteUpdating: false,
  favouriteUpdatingError: null,
  favouriteAdded: false,
  favouriteRemoved: false,

  nowPlayingMoviesLoading: false,
  nowPlayingMoviesLoadingError: null,
  nowPlayingMoviesFetched: false,
  nowPlayingMovies: [],
  nowPlayingPages: null,

  upcomingMoviesLoading: false,
  upcomingMoviesLoadingError: null,
  upcomingMoviesFetched: false,
  upcomingMovies: [],
  upcomingPages: null,

  movieDetailsLoading: false,
  movieDetailsLoadingError: null,
  movieDetailsFetched: false,
  movieDetails: {},

  movieTrailersLoading: false,
  movieTrailersLoadingError: null,
  movieTrailersFetched: false,
  movieTrailers: [],

  commentsLoading: false,
  commentsLoadingError: null,
  commentsFetched: false,
  comments: [],

  commentUpdating: false,
  commentUpdatingError: null,

  likesLoading: false,
  likesLoadingError: null,
  likesFetched: false,
  likes: [],

  likeUpdating: false,
  likeUpdatingError: null,

  dislikesLoading: false,
  dislikesLoadingError: null,
  dislikesFetched: false,
  dislikes: [],

  dislikeUpdating: false,
  dislikeUpdatingError: null,
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
    case MoviesTypes.FETCH_FAVOURITES_REQUEST: {
      return {
        ...state,
        favouritesLoading: true,
        favouritesLoadingError: null,
        favouritesFetched: false,
        favouriteMovies: [],
      };
    }
    case MoviesTypes.FETCH_FAVOURITES_SUCCESS: {
      return {
        ...state,
        favouritesLoading: false,
        favouritesLoadingError: null,
        favouritesFetched: true,
        favouriteMovies: action.payload,
      };
    }
    case MoviesTypes.FETCH_FAVOURITES_ERROR: {
      return {
        ...state,
        favouritesLoading: false,
        favouritesLoadingError: action.payload,
        favouritesFetched: false,
        favouriteMovies: [],
      };
    }
    case MoviesTypes.FETCH_NOW_PLAYING_REQUEST: {
      return {
        ...state,
        nowPlayingMoviesLoading: true,
        nowPlayingMoviesLoadingError: null,
        nowPlayingMoviesFetched: false,
        nowPlayingMovies: [],
        nowPlayingPages: null,
      };
    }
    case MoviesTypes.FETCH_NOW_PLAYING_SUCCESS: {
      return {
        ...state,
        nowPlayingMoviesLoading: false,
        nowPlayingMoviesLoadingError: null,
        nowPlayingMoviesFetched: true,
        nowPlayingMovies: action.payload.nowPlayingMovies,
        nowPlayingPages: action.payload.nowPlayingPages,
      };
    }
    case MoviesTypes.FETCH_NOW_PLAYING_ERROR: {
      return {
        ...state,
        nowPlayingMoviesLoading: false,
        nowPlayingMoviesLoadingError: action.payload,
        nowPlayingMoviesFetched: false,
        nowPlayingMovies: [],
        nowPlayingPages: null,
      };
    }
    case MoviesTypes.FETCH_UPCOMING_REQUEST: {
      return {
        ...state,
        upcomingMoviesLoading: true,
        upcomingMoviesLoadingError: null,
        upcomingMoviesFetched: false,
        upcomingMovies: [],
        upcomingPages: null,
      };
    }
    case MoviesTypes.FETCH_UPCOMING_SUCCESS: {
      return {
        ...state,
        upcomingMoviesLoading: false,
        upcomingMoviesLoadingError: null,
        upcomingMoviesFetched: true,
        upcomingMovies: action.payload.upcomingMovies,
        upcomingPages: action.payload.upcomingPages,
      };
    }
    case MoviesTypes.FETCH_UPCOMING_ERROR: {
      return {
        ...state,
        upcomingMoviesLoading: false,
        upcomingMoviesLoadingError: action.payload,
        upcomingMoviesFetched: false,
        upcomingMovies: [],
        upcomingPages: null,
      };
    }
    case MoviesTypes.FETCH_MOVIE_DETAILS_REQUEST: {
      return {
        ...state,
        movieDetailsLoading: true,
        movieDetailsLoadingError: null,
        movieDetailsFetched: false,
        movieDetails: {},
      };
    }
    case MoviesTypes.FETCH_MOVIE_DETAILS_SUCCESS: {
      return {
        ...state,
        movieDetailsLoading: false,
        movieDetailsLoadingError: null,
        movieDetailsFetched: true,
        movieDetails: action.payload,
      };
    }
    case MoviesTypes.FETCH_MOVIE_DETAILS_ERROR: {
      return {
        ...state,
        movieDetailsLoading: false,
        movieDetailsLoadingError: action.payload,
        movieDetailsFetched: false,
        movieDetails: {},
      };
    }
    case MoviesTypes.FAVOURITE_UPDATING: {
      return {
        ...state,
        favouriteUpdating: true,
        favouriteUpdatingError: null,
        favouriteAdded: false,
        favouriteRemoved: false,
      };
    }
    case MoviesTypes.FAVOURITE_UPDATING_ERROR: {
      return {
        ...state,
        favouriteUpdating: false,
        favouriteUpdatingError: action.payload,
        favouriteAdded: false,
        favouriteRemoved: false,
      };
    }
    case MoviesTypes.ADD_FAVOURITE: {
      return {
        ...state,
        favouriteUpdating: false,
        favouriteUpdatingError: null,
        favouriteAdded: true,
        favouriteRemoved: false,
      };
    }
    case MoviesTypes.REMOVE_FAVOURITE: {
      return {
        ...state,
        favouriteUpdating: false,
        favouriteUpdatingError: null,
        favouriteAdded: false,
        favouriteRemoved: true,
      };
    }
    default: {
      return state;
    }
  }
}

export default MoviesReducer;
