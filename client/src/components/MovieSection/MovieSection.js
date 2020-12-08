import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./MovieSection.scss";

function MovieSection({
  sectionClassName,
  sectionName,
  sectionLoading,
  sectionLoadingError,
  movies,
  totalPages,
  fetchMovies,
}) {
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchMovies(page);
  }, [fetchMovies, page]);

  useEffect(() => {
    setTimeout(() => {
      let hiderContainer = document.querySelector(".hider-cont");
      if (hiderContainer) {
        hiderContainer.classList.remove("invisible");
      }
    }, 700);
  });

  return (
    <div className={sectionClassName}>
      <div className="my-3 mt-sm-3 px-3">
        <h5 className="section-title my-0">{sectionName}</h5>
        <div className="movie-cont my-0 pt-2 pb-3">
          {sectionLoadingError && (
            <div className="d-flex justify-content-center align-items-center border rounded m-1 w-100 mx-auto error-cont">
              <div>
                <p className="my-2 text-center">
                  Whoops, something went wrong...
                </p>
                <p className="my-2 text-center">{sectionLoadingError}</p>
              </div>
            </div>
          )}

          {sectionLoading && (
            <div className="d-flex justify-content-center align-items-center m-1 w-100 mx-auto loading-cont">
              <p className="p-3 my-0">Loading content, please wait...</p>
            </div>
          )}

          {!sectionLoadingError &&
            !sectionLoading &&
            (movies.length === 0 ? (
              <div className="d-flex justify-content-center align-items-center m-1 w-100 mx-auto empty-cont">
                <p className="p-3 my-0">
                  Add movies to your favourites to display them here...
                </p>
              </div>
            ) : (
              <div className="hider-cont invisible">
                {totalPages > 1 && (
                  <div className="next-prev-cont">
                    <button
                      className="btn-prev"
                      type="button"
                      onClick={() => setPage(page - 1)}
                      disabled={page === 1}
                    >
                      <svg
                        width="1.5rem"
                        height="1.5rem"
                        viewBox="0 0 16 16"
                        className="bi bi-arrow-left-circle prev-sign mr-1"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                        />
                        <path
                          fillRule="evenodd"
                          d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
                        />
                      </svg>
                    </button>
                  </div>
                )}

                {movies.length > 0 &&
                  movies.map((movie) => (
                    <Link
                      key={movie.id}
                      to={`/movie/${movie.id}`}
                      className="movie-item mx-1"
                    >
                      <img src={movie.poster_path} alt="Movie poster" />
                    </Link>
                  ))}

                {totalPages > 1 && (
                  <div className="next-prev-cont">
                    <button
                      className="btn-next"
                      type="button"
                      onClick={() => setPage(page + 1)}
                      disabled={page === totalPages}
                    >
                      <svg
                        width="1.5rem"
                        height="1.5rem"
                        viewBox="0 0 16 16"
                        className="bi bi-arrow-right-circle ml-1"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                        />
                        <path
                          fillRule="evenodd"
                          d="M4 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5A.5.5 0 0 0 4 8z"
                        />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default MovieSection;
