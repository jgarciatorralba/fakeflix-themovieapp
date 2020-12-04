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
      .catch((error) => console.log(error));
  };
}
