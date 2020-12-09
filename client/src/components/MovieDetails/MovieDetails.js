import React from "react";

import moment from "moment";

import "./MovieDetails.scss";

function MovieDetails({ details, loading, loadingError }) {
  console.log(details);

  const releaseDate = new moment(details.release_date).format("MMMM Do, YYYY");

  return (
    <div className="MovieDetails">
      <div className="details-cont">
        {loadingError && (
          <div className="d-flex justify-content-center align-items-center border rounded error-cont mx-auto">
            <div>
              <p className="my-2 text-center">
                Whoops, something went wrong...
              </p>
              <p className="my-2 text-center">{loadingError}</p>
            </div>
          </div>
        )}

        {loading && (
          <div className="d-flex justify-content-center align-items-center loading-cont mx-auto">
            <div>
              <p className="p-3 my-0">Loading content, please wait...</p>
            </div>
          </div>
        )}

        {!loadingError && !loading && (
          <div
            className="cover p-3"
            style={{
              backgroundColor: "#141414",
              backgroundImage: `linear-gradient(rgba(20, 20, 20, 0.9), rgba(20, 20, 20, 0.9)), url(${details.backdrop_path})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <div className="row">
              <div className="col-4 col-md-3">
                <img alt="Movie poster" src={details.poster_path} />
              </div>
              <div className="col-8 col-md-9 pl-0">
                <div className="d-flex justify-content-start align-items-center h-100">
                  <div className="movie-info">
                    <h1 className="my-2">
                      <b>{details.title}</b>
                    </h1>
                    <p className="my-1">({releaseDate})</p>
                    <p className="my-1">
                      {details.genres.length > 0 &&
                        details.genres.map((genre, i, arr) => {
                          if (arr.length - 1 === i) {
                            return <span key={genre.id}> {genre.name}</span>;
                          } else {
                            return (
                              <span key={genre.id}> {genre.name} &#8226;</span>
                            );
                          }
                        })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieDetails;
