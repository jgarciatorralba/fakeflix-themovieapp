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

  likesLoading: false,
  likesLoadingError: null,
  likesFetched: false,
  likes: [],

  likeUpdating: false,
  likeUpdatingError: null,
  likeAdded: false,
  likeRemoved: false,

  dislikesLoading: false,
  dislikesLoadingError: null,
  dislikesFetched: false,
  dislikes: [],

  dislikeUpdating: false,
  dislikeUpdatingError: null,
  dislikeAdded: false,
  dislikeRemoved: false,

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
  commentAdded: false,
  commentRemoved: false,
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
    case MoviesTypes.FETCH_LIKES_REQUEST: {
      return {
        ...state,
        likesLoading: true,
        likesLoadingError: null,
        likesFetched: false,
        likes: [],
      };
    }
    case MoviesTypes.FETCH_LIKES_SUCCESS: {
      return {
        ...state,
        likesLoading: false,
        likesLoadingError: null,
        likesFetched: true,
        likes: action.payload,
      };
    }
    case MoviesTypes.FETCH_LIKES_ERROR: {
      return {
        ...state,
        likesLoading: false,
        likesLoadingError: action.payload,
        likesFetched: false,
        likes: [],
      };
    }
    case MoviesTypes.LIKE_UPDATING: {
      return {
        ...state,
        likeUpdating: true,
        likeUpdatingError: null,
        likeAdded: false,
        likeRemoved: false,
      };
    }
    case MoviesTypes.LIKE_UPDATING_ERROR: {
      return {
        ...state,
        likeUpdating: false,
        likeUpdatingError: action.payload,
        likeAdded: false,
        likeRemoved: false,
      };
    }
    case MoviesTypes.ADD_LIKE: {
      return {
        ...state,
        likeUpdating: false,
        likeUpdatingError: null,
        likeAdded: true,
        likeRemoved: false,
      };
    }
    case MoviesTypes.REMOVE_LIKE: {
      return {
        ...state,
        likeUpdating: false,
        likeUpdatingError: null,
        likeAdded: false,
        likeRemoved: true,
      };
    }
    case MoviesTypes.FETCH_DISLIKES_REQUEST: {
      return {
        ...state,
        dislikesLoading: true,
        dislikesLoadingError: null,
        dislikesFetched: false,
        dislikes: [],
      };
    }
    case MoviesTypes.FETCH_DISLIKES_SUCCESS: {
      return {
        ...state,
        dislikesLoading: false,
        dislikesLoadingError: null,
        dislikesFetched: true,
        dislikes: action.payload,
      };
    }
    case MoviesTypes.FETCH_DISLIKES_ERROR: {
      return {
        ...state,
        dislikesLoading: false,
        dislikesLoadingError: action.payload,
        dislikesFetched: false,
        dislikes: [],
      };
    }
    case MoviesTypes.DISLIKE_UPDATING: {
      return {
        ...state,
        dislikeUpdating: true,
        dislikeUpdatingError: null,
        dislikeAdded: false,
        dislikeRemoved: false,
      };
    }
    case MoviesTypes.DISLIKE_UPDATING_ERROR: {
      return {
        ...state,
        dislikeUpdating: false,
        dislikeUpdatingError: action.payload,
        dislikeAdded: false,
        dislikeRemoved: false,
      };
    }
    case MoviesTypes.ADD_DISLIKE: {
      return {
        ...state,
        dislikeUpdating: false,
        dislikeUpdatingError: null,
        dislikeAdded: true,
        dislikeRemoved: false,
      };
    }
    case MoviesTypes.REMOVE_DISLIKE: {
      return {
        ...state,
        dislikeUpdating: false,
        dislikeUpdatingError: null,
        dislikeAdded: false,
        dislikeRemoved: true,
      };
    }
    case MoviesTypes.FETCH_MOVIE_TRAILERS_REQUEST: {
      return {
        ...state,
        movieTrailersLoading: true,
        movieTrailersLoadingError: null,
        movieTrailersFetched: false,
        movieTrailers: [],
      };
    }
    case MoviesTypes.FETCH_MOVIE_TRAILERS_SUCCESS: {
      return {
        ...state,
        movieTrailersLoading: false,
        movieTrailersLoadingError: null,
        movieTrailersFetched: true,
        movieTrailers: action.payload,
      };
    }
    case MoviesTypes.FETCH_MOVIE_TRAILERS_ERROR: {
      return {
        ...state,
        movieTrailersLoading: false,
        movieTrailersLoadingError: action.payload,
        movieTrailersFetched: false,
        movieTrailers: [],
      };
    }
    case MoviesTypes.FETCH_COMMENTS_REQUEST: {
      return {
        ...state,
        commentsLoading: true,
        commentsLoadingError: null,
        commentsFetched: false,
        comments: [],
      };
    }
    case MoviesTypes.FETCH_COMMENTS_SUCCESS: {
      return {
        ...state,
        commentsLoading: false,
        commentsLoadingError: null,
        commentsFetched: true,
        comments: action.payload,
      };
    }
    case MoviesTypes.FETCH_COMMENTS_ERROR: {
      return {
        ...state,
        commentsLoading: false,
        commentsLoadingError: action.payload,
        commentsFetched: false,
        comments: [],
      };
    }
    case MoviesTypes.COMMENT_UPDATING: {
      return {
        ...state,
        commentUpdating: true,
        commentUpdatingError: null,
        commentAdded: false,
        commentRemoved: false,
      };
    }
    case MoviesTypes.COMMENT_UPDATING_ERROR: {
      return {
        ...state,
        commentUpdating: false,
        commentUpdatingError: action.payload,
        commentAdded: false,
        commentRemoved: false,
      };
    }
    case MoviesTypes.ADD_COMMENT: {
      return {
        ...state,
        commentUpdating: false,
        commentUpdatingError: null,
        commentAdded: true,
        commentRemoved: false,
        comments: [action.payload, ...state.comments],
      };
    }
    case MoviesTypes.REMOVE_COMMENT: {
      return {
        ...state,
        commentUpdating: false,
        commentUpdatingError: null,
        commentAdded: false,
        commentRemoved: true,
        comments: state.comments.filter(
          (comment) => comment._id !== action.payload
        ),
      };
    }
    default: {
      return state;
    }
  }
}

export default MoviesReducer;
