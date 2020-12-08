import React from "react";

import MovieSection from "../MovieSection/MovieSection";

import "./TopRated.scss";

function TopRated({
  topRatedMoviesLoading,
  topRatedMoviesLoadingError,
  topRatedMovies,
  topRatedPages,
  fetchTopRated,
}) {
  return (
    <MovieSection
      sectionClassName="TopRated"
      sectionName="Top Rated"
      sectionLoading={topRatedMoviesLoading}
      sectionLoadingError={topRatedMoviesLoadingError}
      movies={topRatedMovies}
      totalPages={topRatedPages}
      fetchMovies={fetchTopRated}
    />
  );
}

export default TopRated;
