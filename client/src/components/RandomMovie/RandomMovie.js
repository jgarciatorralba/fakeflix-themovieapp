import React, { useEffect } from "react";

import "./RandomMovie.scss";

function RandomMovie({
  randomMovieLoading,
  randomMovieLoadingError,
  randomMovie,
  fetchRandomMovie,
}) {
  useEffect(() => {
    fetchRandomMovie();
  }, [fetchRandomMovie]);

  console.log(randomMovie);

  return (
    <div className="RandomMovie">
      <div
        className="random-movie-poster"
        style={{
          backgroundImage: `url(${randomMovie.backdrop_path})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <p className="bg-dark border border-dark d-inline-block rounded movie-title my-0">
          <b>Recommended movie:</b> {randomMovie.title}
        </p>
        <button className="btn btn-light btn-more-info">
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            className="bi bi-info-circle mr-2"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
            />
            <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z" />
            <circle cx="8" cy="4.5" r="1" />
          </svg>
          More information
        </button>
      </div>
    </div>
  );
}

export default RandomMovie;
