import React from "react";

import MovieSection from "../MovieSection/MovieSection";

import "./Favourites.scss";

function Favourites({
  favouritesLoading,
  favouritesLoadingError,
  favouriteMovies,
  fetchFavourites,
}) {
  return (
    <MovieSection
      sectionClassName="Favourites"
      sectionName="Favourites"
      sectionLoading={favouritesLoading}
      sectionLoadingError={favouritesLoadingError}
      movies={favouriteMovies}
      totalPages="1"
      fetchMovies={fetchFavourites}
    />
  );
}

export default Favourites;
