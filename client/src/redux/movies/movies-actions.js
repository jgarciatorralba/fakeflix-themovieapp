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

export const fetchTopRatedSuccess = ({ topRatedMovies }) => ({
  type: MoviesTypes.FETCH_TOP_RATED_SUCCESS,
  payload: topRatedMovies,
});

export function fetchTopRated({ page }) {
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
              topRatedMovies: data.data,
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
