import React from "react";

import MovieSection from "../MovieSection/MovieSection";

import "./Upcoming.scss";

function Upcoming({
  upcomingMoviesLoading,
  upcomingMoviesLoadingError,
  upcomingMovies,
  upcomingPages,
  fetchUpcoming,
}) {
  return (
    <MovieSection
      sectionClassName="Upcoming"
      sectionName="Upcoming"
      sectionLoading={upcomingMoviesLoading}
      sectionLoadingError={upcomingMoviesLoadingError}
      movies={upcomingMovies}
      totalPages={upcomingPages}
      fetchMovies={fetchUpcoming}
    />
  );
}

export default Upcoming;
