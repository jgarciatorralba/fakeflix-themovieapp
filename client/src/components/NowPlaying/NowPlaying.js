import React from "react";

import MovieSection from "../MovieSection/MovieSection";

import "./NowPlaying.scss";

function NowPlaying({
  nowPlayingMoviesLoading,
  nowPlayingMoviesLoadingError,
  nowPlayingMovies,
  nowPlayingPages,
  fetchNowPlaying,
}) {
  return (
    <MovieSection
      sectionClassName="NowPlaying"
      sectionName="Now Playing"
      sectionLoading={nowPlayingMoviesLoading}
      sectionLoadingError={nowPlayingMoviesLoadingError}
      movies={nowPlayingMovies}
      totalPages={nowPlayingPages}
      fetchMovies={fetchNowPlaying}
    />
  );
}

export default NowPlaying;
