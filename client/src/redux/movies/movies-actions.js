import MoviesTypes from "./movies-types";

export const fetchRandomRequest = () => ({
  type: MoviesTypes.FETCH_RANDOM_REQUEST,
});

export const fetchRandomError = ({ errorMessage }) => ({
  type: MoviesTypes.FETCH_RANDOM_ERROR,
  payload: errorMessage,
});

export const fetchRandomSuccess = ({ randomMovie }) => ({
  type: MoviesTypes.FETCH_RANDOM_SUCCESS,
  payload: randomMovie,
});

export function fetchRandomMovie() {
  return async function fetchRandomMovieThunk(dispatch, getState) {
    const token = getState().user.currentUser.token;

    dispatch(fetchRandomRequest());

    const res = await fetch("/api/movie/random", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).catch((error) => {
      dispatch(fetchRandomError({ errorMessage: error.message }));
    });

    const data = await res.json();
    if (data.data) {
      dispatch(
        fetchRandomSuccess({
          randomMovie: data.data,
        })
      );
    } else {
      dispatch(fetchRandomError({ errorMessage: data.error }));
    }
  };
}

export const fetchTopRatedRequest = () => ({
  type: MoviesTypes.FETCH_TOP_RATED_REQUEST,
});

export const fetchTopRatedError = ({ errorMessage }) => ({
  type: MoviesTypes.FETCH_TOP_RATED_ERROR,
  payload: errorMessage,
});

export const fetchTopRatedSuccess = ({ topRatedMovies, topRatedPages }) => ({
  type: MoviesTypes.FETCH_TOP_RATED_SUCCESS,
  payload: { topRatedMovies, topRatedPages },
});

export function fetchTopRated(page) {
  return async function fetchTopRatedThunk(dispatch, getState) {
    const token = getState().user.currentUser.token;

    dispatch(fetchTopRatedRequest());

    const res = await fetch(`/api/movie/top-rated?page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).catch((error) => {
      dispatch(fetchTopRatedError({ errorMessage: error.message }));
    });

    const data = await res.json();
    if (data.data) {
      dispatch(
        fetchTopRatedSuccess({
          topRatedMovies: data.data.results,
          topRatedPages: data.data.totalPages,
        })
      );
    } else {
      dispatch(fetchTopRatedError({ errorMessage: data.error }));
    }
  };
}

export const fetchFavouritesRequest = () => ({
  type: MoviesTypes.FETCH_FAVOURITES_REQUEST,
});

export const fetchFavouritesError = ({ errorMessage }) => ({
  type: MoviesTypes.FETCH_FAVOURITES_ERROR,
  payload: errorMessage,
});

export const fetchFavouritesSuccess = ({ favouriteMovies }) => ({
  type: MoviesTypes.FETCH_FAVOURITES_SUCCESS,
  payload: favouriteMovies,
});

export function fetchFavourites() {
  return function fetchFavouritesThunk(dispatch, getState) {
    const token = getState().user.currentUser.token;

    dispatch(fetchFavouritesRequest());

    fetch("/api/movie/favourites", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          dispatch(
            fetchFavouritesSuccess({
              favouriteMovies: data.data,
            })
          );
        } else {
          dispatch(fetchFavouritesError({ errorMessage: data.error }));
        }
      })
      .catch((error) =>
        dispatch(fetchFavouritesError({ errorMessage: error.message }))
      );
  };
}

export const fetchNowPlayingRequest = () => ({
  type: MoviesTypes.FETCH_NOW_PLAYING_REQUEST,
});

export const fetchNowPlayingError = ({ errorMessage }) => ({
  type: MoviesTypes.FETCH_NOW_PLAYING_ERROR,
  payload: errorMessage,
});

export const fetchNowPlayingSuccess = ({
  nowPlayingMovies,
  nowPlayingPages,
}) => ({
  type: MoviesTypes.FETCH_NOW_PLAYING_SUCCESS,
  payload: { nowPlayingMovies, nowPlayingPages },
});

export function fetchNowPlaying(page) {
  return function fetchNowPlayingThunk(dispatch, getState) {
    const token = getState().user.currentUser.token;

    dispatch(fetchNowPlayingRequest());

    fetch(`/api/movie/now-playing?page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          dispatch(
            fetchNowPlayingSuccess({
              nowPlayingMovies: data.data.results,
              nowPlayingPages: data.data.totalPages,
            })
          );
        } else {
          dispatch(fetchNowPlayingError({ errorMessage: data.error }));
        }
      })
      .catch((error) =>
        dispatch(fetchNowPlayingError({ errorMessage: error.message }))
      );
  };
}

export const fetchUpcomingRequest = () => ({
  type: MoviesTypes.FETCH_UPCOMING_REQUEST,
});

export const fetchUpcomingError = ({ errorMessage }) => ({
  type: MoviesTypes.FETCH_UPCOMING_ERROR,
  payload: errorMessage,
});

export const fetchUpcomingSuccess = ({ upcomingMovies, upcomingPages }) => ({
  type: MoviesTypes.FETCH_UPCOMING_SUCCESS,
  payload: { upcomingMovies, upcomingPages },
});

export function fetchUpcoming(page) {
  return function fetchUpcomingThunk(dispatch, getState) {
    const token = getState().user.currentUser.token;

    dispatch(fetchUpcomingRequest());

    fetch(`/api/movie/upcoming?page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          dispatch(
            fetchUpcomingSuccess({
              upcomingMovies: data.data.results,
              upcomingPages: data.data.totalPages,
            })
          );
        } else {
          dispatch(fetchUpcomingError({ errorMessage: data.error }));
        }
      })
      .catch((error) =>
        dispatch(fetchUpcomingError({ errorMessage: error.message }))
      );
  };
}

export const fetchMovieDetailsRequest = () => ({
  type: MoviesTypes.FETCH_MOVIE_DETAILS_REQUEST,
});

export const fetchMovieDetailsError = ({ errorMessage }) => ({
  type: MoviesTypes.FETCH_MOVIE_DETAILS_ERROR,
  payload: errorMessage,
});

export const fetchMovieDetailsSuccess = ({ movieDetails }) => ({
  type: MoviesTypes.FETCH_MOVIE_DETAILS_SUCCESS,
  payload: movieDetails,
});

export function fetchMovieDetails(movie_id) {
  return async function fetchMovieDetailsThunk(dispatch, getState) {
    const token = getState().user.currentUser.token;

    dispatch(fetchMovieDetailsRequest());

    const res = await fetch(`/api/movie/details/${movie_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).catch((error) => {
      dispatch(fetchMovieDetailsError({ errorMessage: error.message }));
    });

    const data = await res.json();
    if (data.data) {
      dispatch(
        fetchMovieDetailsSuccess({
          movieDetails: data.data,
        })
      );
    } else {
      dispatch(fetchMovieDetailsError({ errorMessage: data.error }));
    }
  };
}

export const updateFavouriteRequest = () => ({
  type: MoviesTypes.FAVOURITE_UPDATING,
});

export const updateFavouriteError = ({ errorMessage }) => ({
  type: MoviesTypes.FAVOURITE_UPDATING_ERROR,
  payload: errorMessage,
});

export const addFavouriteSuccess = () => ({
  type: MoviesTypes.ADD_FAVOURITE,
});

export const removeFavouriteSuccess = () => ({
  type: MoviesTypes.REMOVE_FAVOURITE,
});

export function addFavourite(movie_id) {
  return async function addFavouriteThunk(dispatch, getState) {
    const token = getState().user.currentUser.token;

    dispatch(updateFavouriteRequest());

    const res = await fetch(`/api/favourite/${movie_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).catch((error) => {
      dispatch(updateFavouriteError({ errorMessage: error.message }));
    });

    const data = await res.json();
    if (data.data) {
      dispatch(addFavouriteSuccess());
    } else {
      dispatch(updateFavouriteError({ errorMessage: data.error }));
    }
  };
}

export function removeFavourite(movie_id) {
  return function removeFavouriteThunk(dispatch, getState) {
    const token = getState().user.currentUser.token;

    dispatch(updateFavouriteRequest());

    fetch(`/api/favourite/${movie_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          dispatch(removeFavouriteSuccess());
        } else {
          dispatch(updateFavouriteError({ errorMessage: data.error }));
        }
      })
      .catch((error) =>
        dispatch(updateFavouriteError({ errorMessage: error.message }))
      );
  };
}

export const fetchLikesRequest = () => ({
  type: MoviesTypes.FETCH_LIKES_REQUEST,
});

export const fetchLikesError = ({ errorMessage }) => ({
  type: MoviesTypes.FETCH_LIKES_ERROR,
  payload: errorMessage,
});

export const fetchLikesSuccess = ({ likes }) => ({
  type: MoviesTypes.FETCH_LIKES_SUCCESS,
  payload: likes,
});

export function fetchLikes(movie_id) {
  return function fetchLikesThunk(dispatch, getState) {
    const token = getState().user.currentUser.token;

    dispatch(fetchLikesRequest());

    fetch(`/api/like/${movie_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          dispatch(
            fetchLikesSuccess({
              likes: data.data,
            })
          );
        } else {
          dispatch(fetchLikesError({ errorMessage: data.error }));
        }
      })
      .catch((error) =>
        dispatch(fetchLikesError({ errorMessage: error.message }))
      );
  };
}

export const fetchDislikesRequest = () => ({
  type: MoviesTypes.FETCH_DISLIKES_REQUEST,
});

export const fetchDislikesError = ({ errorMessage }) => ({
  type: MoviesTypes.FETCH_DISLIKES_ERROR,
  payload: errorMessage,
});

export const fetchDislikesSuccess = ({ dislikes }) => ({
  type: MoviesTypes.FETCH_DISLIKES_SUCCESS,
  payload: dislikes,
});

export function fetchDislikes(movie_id) {
  return function fetchDislikesThunk(dispatch, getState) {
    const token = getState().user.currentUser.token;

    dispatch(fetchDislikesRequest());

    fetch(`/api/dislike/${movie_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          dispatch(
            fetchDislikesSuccess({
              dislikes: data.data,
            })
          );
        } else {
          dispatch(fetchDislikesError({ errorMessage: data.error }));
        }
      })
      .catch((error) =>
        dispatch(fetchDislikesError({ errorMessage: error.message }))
      );
  };
}

export const updateLikeRequest = () => ({
  type: MoviesTypes.LIKE_UPDATING,
});

export const updateLikeError = ({ errorMessage }) => ({
  type: MoviesTypes.LIKE_UPDATING_ERROR,
  payload: errorMessage,
});

export const addLikeSuccess = () => ({
  type: MoviesTypes.ADD_LIKE,
});

export const removeLikeSuccess = () => ({
  type: MoviesTypes.REMOVE_LIKE,
});

export function addLike(movie_id) {
  return function addLikeThunk(dispatch, getState) {
    const token = getState().user.currentUser.token;

    dispatch(updateLikeRequest());

    fetch(`/api/like/${movie_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          dispatch(addLikeSuccess());
        } else {
          dispatch(updateLikeError({ errorMessage: data.error }));
        }
      })
      .catch((error) =>
        dispatch(updateLikeError({ errorMessage: error.message }))
      );
  };
}

export function removeLike(movie_id) {
  return function removeLikeThunk(dispatch, getState) {
    const token = getState().user.currentUser.token;

    dispatch(updateLikeRequest());

    fetch(`/api/like/${movie_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          dispatch(removeLikeSuccess());
        } else {
          dispatch(updateLikeError({ errorMessage: data.error }));
        }
      })
      .catch((error) =>
        dispatch(updateLikeError({ errorMessage: error.message }))
      );
  };
}

export const updateDislikeRequest = () => ({
  type: MoviesTypes.DISLIKE_UPDATING,
});

export const updateDislikeError = ({ errorMessage }) => ({
  type: MoviesTypes.DISLIKE_UPDATING_ERROR,
  payload: errorMessage,
});

export const addDislikeSuccess = () => ({
  type: MoviesTypes.ADD_DISLIKE,
});

export const removeDislikeSuccess = () => ({
  type: MoviesTypes.REMOVE_DISLIKE,
});

export function addDislike(movie_id) {
  return function addDislikeThunk(dispatch, getState) {
    const token = getState().user.currentUser.token;

    dispatch(updateDislikeRequest());

    fetch(`/api/dislike/${movie_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          dispatch(addDislikeSuccess());
        } else {
          dispatch(updateDislikeError({ errorMessage: data.error }));
        }
      })
      .catch((error) =>
        dispatch(updateDislikeError({ errorMessage: error.message }))
      );
  };
}

export function removeDislike(movie_id) {
  return function removeDislikeThunk(dispatch, getState) {
    const token = getState().user.currentUser.token;

    dispatch(updateDislikeRequest());

    fetch(`/api/dislike/${movie_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          dispatch(removeDislikeSuccess());
        } else {
          dispatch(updateDislikeError({ errorMessage: data.error }));
        }
      })
      .catch((error) =>
        dispatch(updateDislikeError({ errorMessage: error.message }))
      );
  };
}

export const fetchMovieTrailersRequest = () => ({
  type: MoviesTypes.FETCH_MOVIE_TRAILERS_REQUEST,
});

export const fetchMovieTrailersError = ({ errorMessage }) => ({
  type: MoviesTypes.FETCH_MOVIE_TRAILERS_ERROR,
  payload: errorMessage,
});

export const fetchMovieTrailersSuccess = ({ movieTrailers }) => ({
  type: MoviesTypes.FETCH_MOVIE_TRAILERS_SUCCESS,
  payload: movieTrailers,
});

export function fetchMovieTrailers(movie_id) {
  return function fetchMovieTrailersThunk(dispatch, getState) {
    const token = getState().user.currentUser.token;

    dispatch(fetchMovieTrailersRequest());

    fetch(`/api/movie/trailers/${movie_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          dispatch(
            fetchMovieTrailersSuccess({
              movieTrailers: data.data,
            })
          );
        } else {
          dispatch(fetchMovieTrailersError({ errorMessage: data.error }));
        }
      })
      .catch((error) =>
        dispatch(fetchMovieTrailersError({ errorMessage: error.message }))
      );
  };
}

export const fetchCommentsRequest = () => ({
  type: MoviesTypes.FETCH_COMMENTS_REQUEST,
});

export const fetchCommentsError = ({ errorMessage }) => ({
  type: MoviesTypes.FETCH_COMMENTS_ERROR,
  payload: errorMessage,
});

export const fetchCommentsSuccess = ({ comments }) => ({
  type: MoviesTypes.FETCH_COMMENTS_SUCCESS,
  payload: comments,
});

export function fetchComments(movie_id) {
  return function fetchCommentsThunk(dispatch, getState) {
    const token = getState().user.currentUser.token;

    dispatch(fetchCommentsRequest());

    fetch(`/api/comment/${movie_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          dispatch(
            fetchCommentsSuccess({
              comments: data.data,
            })
          );
        } else {
          dispatch(fetchCommentsError({ errorMessage: data.error }));
        }
      })
      .catch((error) =>
        dispatch(fetchCommentsError({ errorMessage: error.message }))
      );
  };
}

export const updateCommentRequest = () => ({
  type: MoviesTypes.COMMENT_UPDATING,
});

export const updateCommentError = ({ errorMessage }) => ({
  type: MoviesTypes.COMMENT_UPDATING_ERROR,
  payload: errorMessage,
});

export const addCommentSuccess = ({ newComment }) => ({
  type: MoviesTypes.ADD_COMMENT,
  payload: newComment,
});

export const removeCommentSuccess = ({ removedCommentId }) => ({
  type: MoviesTypes.REMOVE_COMMENT,
  payload: removedCommentId,
});

export function addComment(movie_id, content) {
  return function addCommentThunk(dispatch, getState) {
    const token = getState().user.currentUser.token;

    dispatch(updateCommentRequest());

    fetch(`/api/comment/${movie_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        content: content,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          dispatch(addCommentSuccess({ newComment: data.data }));
        } else {
          dispatch(updateCommentError({ errorMessage: data.error }));
        }
      })
      .catch((error) =>
        dispatch(updateCommentError({ errorMessage: error.message }))
      );
  };
}

export function removeComment(comment_id) {
  return function removeCommentThunk(dispatch, getState) {
    const token = getState().user.currentUser.token;

    dispatch(updateCommentRequest());

    fetch(`/api/comment/${comment_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          dispatch(removeCommentSuccess({ removedCommentId: comment_id }));
        } else {
          dispatch(updateCommentError({ errorMessage: data.error }));
        }
      })
      .catch((error) =>
        dispatch(updateCommentError({ errorMessage: error.message }))
      );
  };
}
