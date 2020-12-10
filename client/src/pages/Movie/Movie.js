import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Redirect } from "react-router-dom";

import ROUTES from "../../utils/routes";

import HeaderContainer from "../../redux/containers/components/HeaderContainer";
import MovieDetails from "../../components/MovieDetails/MovieDetails";
import Footer from "../../components/Footer/Footer";

import "./Movie.scss";

function Movie({
  isAuthenticated,
  movieDetailsLoading,
  movieDetailsLoadingError,
  movieDetails,
  fetchMovieDetails,

  favouriteMovies,
  fetchFavourites,
  addFavourite,
  removeFavourite,
  favouriteUpdating,
  favouriteUpdatingError,
  favouriteAdded,
  favouriteRemoved,
}) {
  let { movie_id } = useParams();

  useEffect(() => {
    fetchMovieDetails(movie_id);
    fetchFavourites();
  }, [fetchMovieDetails, fetchFavourites, movie_id]);

  if (!isAuthenticated) {
    return <Redirect to={ROUTES.LOGIN} />;
  }

  return (
    <div className="Movie">
      <HeaderContainer />
      <MovieDetails
        details={movieDetails}
        loading={movieDetailsLoading}
        loadingError={movieDetailsLoadingError}
        favourites={favouriteMovies}
        addFavourite={addFavourite}
        removeFavourite={removeFavourite}
        favouriteUpdating={favouriteUpdating}
        favouriteUpdatingError={favouriteUpdatingError}
        favouriteAdded={favouriteAdded}
        favouriteRemoved={favouriteRemoved}
      />
      <Footer />
    </div>
  );
}

export default Movie;
