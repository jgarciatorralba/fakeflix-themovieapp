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
