import { connect } from "react-redux";

import { fetchFavourites } from "../../movies/movies-actions";

import Favourites from "../../../components/Favourites/Favourites";

const mapStateToProps = (state) => ({
  favouritesLoading: state.movies.favouritesLoading,
  favouritesLoadingError: state.movies.favouritesLoadingError,
  favouritesFetched: state.movies.favouritesFetched,
  favouriteMovies: state.movies.favouriteMovies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchFavourites: () => dispatch(fetchFavourites()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Favourites);
