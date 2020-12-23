import { connect } from "react-redux";

import { fetchUpcoming } from "../../movies/movies-actions";

import Upcoming from "../../../components/Upcoming/Upcoming";

const mapStateToProps = (state) => ({
  upcomingMoviesLoading: state.movies.upcomingMoviesLoading,
  upcomingMoviesLoadingError: state.movies.upcomingMoviesLoadingError,
  upcomingMoviesFetched: state.movies.upcomingMoviesFetched,
  upcomingMovies: state.movies.upcomingMovies,
  upcomingPages: state.movies.upcomingPages,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUpcoming: (page) => dispatch(fetchUpcoming(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Upcoming);
