import React from "react";
import YouTube from "react-youtube";

import "./MovieTrailers.scss";

function MovieTrailers({
  movieTrailers,
  movieTrailersLoading,
  movieTrailersLoadingError,
}) {
  const opts = {
    playerVars: {
      autoplay: 0,
      rel: 0,
      modestbranding: 1,
    },
  };

  return (
    <div className="MovieTrailers">
      <div className="my-3 mt-sm-3 px-3">
        <h5 className="section-title my-0">Media</h5>
        <div className="trailer-cont my-0 pt-2 pb-0">
          {movieTrailersLoadingError && (
            <div className="d-flex justify-content-center align-items-center border rounded m-1 w-100 mx-auto p-3 error-cont">
              <div>
                <p className="my-2 text-center">
                  Whoops, something went wrong...
                </p>
                <p className="my-2 text-center">{movieTrailersLoadingError}</p>
              </div>
            </div>
          )}

          {movieTrailersLoading && (
            <div className="d-flex justify-content-center align-items-center m-1 w-100 mx-auto loading-cont">
              <svg
                width="2rem"
                height="2rem"
                viewBox="0 0 16 16"
                className="bi bi-hourglass-split"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2h-7zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48V8.35zm1 0c0 .701.478 1.236 1.011 1.492A3.5 3.5 0 0 1 11.5 13s-.866-1.299-3-1.48V8.35z"
                />
              </svg>
            </div>
          )}

          {!movieTrailersLoadingError &&
            !movieTrailersLoading &&
            (movieTrailers.length === 0 ? (
              <div className="d-flex justify-content-center align-items-center m-1 w-100 mx-auto empty-cont rounded">
                <p className="p-3 my-0">No trailers found for this movie...</p>
              </div>
            ) : (
              movieTrailers.map((trailer) => {
                const urlParams = new URLSearchParams(
                  new URL(trailer.key).search
                );
                return (
                  <YouTube
                    key={trailer.id}
                    videoId={urlParams.get("v")}
                    opts={opts}
                  />
                );
              })
            ))}
        </div>
      </div>
    </div>
  );
}

export default MovieTrailers;
