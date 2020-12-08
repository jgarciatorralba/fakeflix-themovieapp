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
  return function fetchRandomMovieThunk(dispatch, getState) {
    const token = getState().user.currentUser.token;

    dispatch(fetchRandomRequest());

    fetch("/api/movie/random", {
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
            fetchRandomSuccess({
              randomMovie: data.data,
            })
          );
        } else {
          dispatch(fetchRandomError({ errorMessage: data.error }));
        }
      })
      .catch((error) =>
        dispatch(fetchRandomError({ errorMessage: error.message }))
      );
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
  return function fetchTopRatedThunk(dispatch, getState) {
    const token = getState().user.currentUser.token;

    dispatch(fetchTopRatedRequest());

    fetch(`/api/movie/top-rated?page=${page}`, {
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
            fetchTopRatedSuccess({
              topRatedMovies: data.data.results,
              topRatedPages: data.data.totalPages,
            })
          );
        } else {
          dispatch(fetchTopRatedError({ errorMessage: data.error }));
        }
      })
      .catch((error) =>
        dispatch(fetchTopRatedError({ errorMessage: error.message }))
      );
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
